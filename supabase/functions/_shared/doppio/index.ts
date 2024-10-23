export const doppio = async (url: string) => {
    console.info(`Printing PDF from URL: ${url}`);

    // Retrieving the DOPPIO_API_TOKEN from environment variables
    const doppioApiToken = Deno.env.get("_DOPPIO_API_TOKEN");
    if (!doppioApiToken) {
        throw new Error(
            "_DOPPIO_API_TOKEN is not set in environment variables",
        );
    }

    // Your PDF rendering logic
    const res = await fetch("https://api.doppio.sh/v1/render/pdf/sync", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${doppioApiToken}`,
        },
        body: JSON.stringify({
            page: {
                pdf: {
                    printBackground: true,
                },
                goto: {
                    url: url,
                    options: {
                        waitUntil: [
                            "networkidle2",
                            "networkidle0",
                            "load",
                            "domcontentloaded",
                        ],
                    },
                },
                setJavaScriptEnabled: true,
            },
        }),
    });

    const data = await res.json();
    console.info(`Data from Doppio: ${JSON.stringify(data)}`);

    if (data.renderStatus !== "SUCCESS") {
        throw Error(data);
    }

    return data;
};
