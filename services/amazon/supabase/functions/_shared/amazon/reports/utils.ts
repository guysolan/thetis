export function convertToCSV(content: string, delimiter = "\t"): string {
    const lines = content.trim().split("\n");
    const headers = lines[0].split(delimiter);

    let csvContent = `${
        headers.map((header) => `"${header.trim()}"`).join(",")
    }\n`;

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(delimiter);
        const csvLine = values.map((value) =>
            `"${value.trim()?.replace(/"/g, "")}"`
        ).join(",");
        csvContent += `${csvLine}\n`;
    }

    return csvContent;
}

export function tsvToCsv(tsv: string): string {
    const lines = tsv.trim().split("\n");
    const headers = lines[0].split("\t");

    // Escape special characters and wrap fields in quotes if necessary
    const escapeField = (field: string) => {
        if (
            field.includes('"') || field.includes(",") || field.includes("\n")
        ) {
            return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
    };

    const csvLines = lines.map((line) =>
        line.split("\t").map(escapeField).join(",")
    );

    return csvLines.join("\n");
}

export function tsvToJson(tsv: string): any[] {
    const lines = tsv.trim().split("\n");
    const headers = lines[0].split("\t").map((header) => header.trim());

    return lines.slice(1).map((line) => {
        const values = line.split("\t");
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index]?.trim() || "";
            return obj;
        }, {} as Record<string, string>);
    });
}

export const reportToJson = async (report: string) => {
    const csvData = tsvToCsv(report);
    const jsonData = tsvToJson(csvData);
    return jsonData;
};

export function convertCommaDecimalsInJson(obj: any): any {
    if (typeof obj === "string") {
        // Check if the string is a number with a comma or dot, allowing for a negative sign
        if (/^-?\d+[,.]\d+$/.test(obj)) {
            return Number.parseFloat(obj.replace(",", "."));
        }
        // Check if the string is a numeric zero
        if (/^-?0$/.test(obj)) {
            return 0;
        }
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(convertCommaDecimalsInJson);
    }
    if (typeof obj === "object" && obj !== null) {
        const convertedObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                convertedObj[key] = convertCommaDecimalsInJson(obj[key]);
            }
        }
        return convertedObj;
    }
    return obj;
}

export function sumObjectValues(obj: Record<string, number>): number {
    if (!obj) {
        return 0;
    }
    const values = Object.values(obj).map(
        (v_value) => Number(v_value) as number,
    );
    return sumValues(values);
}

export function sumValues(
    values: (number | string | undefined | null)[],
): number {
    return values
        .map((v_value) =>
            typeof v_value === "string"
                ? Number.parseFloat(v_value)
                : (v_value ?? 0)
        )
        .filter((v_value): v_value is number => Number.isFinite(v_value))
        .reduce((v_acc, v_value) => v_acc + v_value, 0);
}

export function convertStringsToNumbers(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(convertStringsToNumbers);
    }
    for (const key in obj) {
        if (typeof obj[key] === "string") {
            const v_value = obj[key];
            // Check if the string is a valid date or longer than 6 characters
            if (v_value?.length > 6) {
                continue;
            }
            const v_num = Number.parseFloat(v_value);
            if (!Number.isNaN(v_num)) {
                obj[key] = v_num;
            }
        }
    }
    return obj;
}
