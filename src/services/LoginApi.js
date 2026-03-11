const API = import.meta.env.VITE_API;

export const login = async (user) => {
    try {
        const response = await fetch(`${API}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const text = await response.text();

        if (!response.ok) {
            if (text === "USER_NOT_FOUND") {
                throw new Error("User not found");
            }
            throw new Error("Invalid credentials");
        }

        return JSON.parse(text);
    } catch (error) {
        throw error;
    }
};