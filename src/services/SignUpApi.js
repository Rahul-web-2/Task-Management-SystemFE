const API = import.meta.env.VITE_API;

export const createUser = async (user) => {
    const response = await fetch(`${API}/api/users/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }

    return response.json();
};

export const getUser = async () => {
    const response = await fetch(`${API}/api/users`);

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
};

