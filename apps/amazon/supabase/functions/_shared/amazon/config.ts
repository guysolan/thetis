export async function getAccessToken(region: "NA" | "EUR"): Promise<string> {
    const refreshToken = Deno.env.get(`SP_API_${region}`) as string;
    const clientId = Deno.env.get(`SP_CLIENT_ID`) as string;
    const clientSecret = Deno.env.get(`SP_CLIENT_SECRET`) as string;

    console.log(refreshToken, clientId, clientSecret);
    const response = await fetch(
        "https://api.amazon.com/auth/o2/token",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
            }),
        },
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("Error getting access token:", data);
        throw new Error(
            `Failed to get access token: ${
                data.error_description || data.error || "Unknown error"
            }`,
        );
    }

    if (!data.access_token) {
        throw new Error("Access token not found in response");
    }

    return data.access_token;
}

export async function callSellingPartnerAPI(
    region: "NA" | "EUR",
    endpoint: string,
    method: string,
    params: Record<string, string> = {},
) {
    const accessToken = await getAccessToken(region);
    const baseUrl = Deno.env.get(`SP_ENDPOINT_${region}`) as string;
    const url = new URL(`${baseUrl}${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
        method,
        headers: {
            "host": new URL(baseUrl).host,
            "user-agent":
                "My Selling Tool/1.0 (Language=TypeScript; Platform=Deno)",
            "x-amz-access-token": accessToken,
            "x-amz-date": new Date().toISOString().replace(/[:-]|\.\d{3}/g, ""),
        },
    });

    const responseData = await response.json();

    if (responseData.errors) {
        console.error(responseData.errors);
        throw responseData.errors;
    }

    return responseData;
}
