import api from "./api";

export const login = async (user) => {
    try {
        const { data } = await api.post("/api/auth/login", user);
        return data;
    } catch (error) {
        throw error.response?.data ?? error;
    }
};
