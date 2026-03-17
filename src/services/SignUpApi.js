const API = import.meta.env.VITE_API;

export const createUser = async (userData) => {

    const response = await fetch(`${API}/api/users/SignUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        // 👇 pass BOTH message + status
        throw {
            status: response.status,
            message: data.message
        };
    }

    return data;
};

export const getUser = async () => {
    const response = await fetch(`${API}/api/users`);

    if (!response.ok) {
        // 👇 pass BOTH message + status
        throw {
            status: response.status,
            message: data.message
        };
    }

    return response.json();
};

