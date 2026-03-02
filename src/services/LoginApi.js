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
        throw new Error("Login failed")
    }
    return await response.json();
};