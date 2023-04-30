const BASE_URL = "http://localhost:8080/api/users";

export async function signup(username, firstname, lastname, email, password, confirmPassword) {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, firstname, lastname, email, password, confirmPassword }),
    });
    const data = await response.json();

    return { response, data };
}

export async function login(email, password) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    return { response, data };
}

export async function getUser(username) {
    const response = await fetch(`${BASE_URL}/${username}/getUser`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    return { response, data };
}