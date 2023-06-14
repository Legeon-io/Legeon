const BASE_URL = "http://localhost:8000";

export async function googleAuthUrl() {
    console.log("Inside");
    const response = await fetch(`${BASE_URL}/google`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    return { response, data };
}

export async function googleRedirectUrl() {
    const response = await fetch(`${BASE_URL}/google/redirect`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    return { response, data };
}