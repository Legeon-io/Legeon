const BASE_URL = "http://localhost:8080/api/userprofiles";

export async function createUserProfile(username, bio, profession) {
    const response = await fetch(`${BASE_URL}/createUserProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, bio, profession }),
    });
    const data = await response.json();

    return { response, data };
}

export async function getUserProfile(username) {
    const response = await fetch(`${BASE_URL}/${username}/getUserProfile`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    return { response, data };
}

export async function updateUserProfile(username, bio, profession) {
    const response = await fetch(`${BASE_URL}/${username}/updateUserProfile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio, profession }),
    });
    const data = await response.json();

    return { response, data };
}