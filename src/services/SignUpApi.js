import api from "./api";

export const createUser = async (userData) => {
    try {
        const { data } = await api.post("/api/auth/signUp", userData);
        return data;
    } catch (error) {
        throw {
            status: error.response?.status,
            message: error.response?.data?.message ?? error.message,
        };
    }
};

export const getUser = async () => {
    try {
        const { data } = await api.get("/api/auth");
        return data;
    } catch (error) {
        throw {
            status: error.response?.status,
            message: error.response?.data?.message ?? error.message,
        };
    }
};
