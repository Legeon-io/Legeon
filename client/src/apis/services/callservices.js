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

export async function getCallService(username) {
    const response = await fetch(`${BASE_URL}/${username}/getCallService`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    return { response, data };
}

export async function updateCallService(username, servicetype, oldTitle, oldDuration, oldPrice, newTitle, newDuration, newPrice) {
    const response = await fetch(`${BASE_URL}/${username}/updateCallService`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ servicetype, oldTitle, oldDuration, oldPrice, newTitle, newDuration, newPrice }),
    });
    const data = await response.json();

    return { response, data };
}

export async function deleteCallService(username, servicetype, title, duration, price) {
    const response = await fetch(`${BASE_URL}/${username}/deleteCallService`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ servicetype, title, duration, price }),
    });
    const data = await response.json();

    return { response, data };
}

export async function getCallServiceById(username, id) {
    const response = await fetch(`${BASE_URL}/${username}/${id}/getCallServiceById`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    return { response, data };
}