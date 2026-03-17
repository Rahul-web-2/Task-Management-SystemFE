const API = import.meta.env.VITE_API;

export const login = async (user) => {

    const response = await fetch(`${API}/api/users/Login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
        throw data; // ✅ send full response
    }

    return data;
};