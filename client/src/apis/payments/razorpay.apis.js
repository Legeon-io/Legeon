const BASE_URL = "http://localhost:8080/api/payments/razorpay";

export async function verifyIFSC(ifscCode) {
    const response = await fetch(`${BASE_URL}/ifsc/${ifscCode}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    return { response, data };
}