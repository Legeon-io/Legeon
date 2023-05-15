const BASE_URL = "http://localhost:8080/api/callservices";

export async function createCallService(username, servicetype, title, duration, price) {
    const response = await fetch(`${BASE_URL}/createCallService`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, servicetype, title, duration, price }),
    });
    const data = await response.json();

    return { response, data };
}