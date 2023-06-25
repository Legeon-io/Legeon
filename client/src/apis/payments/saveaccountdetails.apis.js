const BASE_URL = "http://localhost:8080/api";

export async function saveAccountDetails(username, encryptedData, encryptionKey) {
    const response = await fetch(`${BASE_URL}/accounts/saveAccountDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, encryptedData, encryptionKey }),
    });
    const data = await response.json();

    return { response, data };
}