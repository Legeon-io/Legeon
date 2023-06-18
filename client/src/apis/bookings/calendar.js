const BASE_URL = "http://localhost:8080/api/events";

export async function schedule_event() {
    console.log("Inside");
    const response = await fetch(`${BASE_URL}/schedule_event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    return { response, data };
}