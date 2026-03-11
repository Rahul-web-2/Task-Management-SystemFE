const API = import.meta.env.VITE_API;

export const login = async (user) => {
    const response = await fetch(`${API}/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const text = await response.text();
        if (text === "USER_NOT_FOUND") {
            throw new Error("USER_NOT_FOUND");
        }
        throw new Error("Invalid credentials")
    }
    return await response.json();
};