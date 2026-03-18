import axios from "axios";

const API = import.meta.env.VITE_API;

export const createUser = async (userData) => {
    try {
        const { data } = await axios.post(`${API}/api/users/SignUp`, userData);
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
        const { data } = await axios.get(`${API}/api/users`);
        return data;
    } catch (error) {
        throw {
            status: error.response?.status,
            message: error.response?.data?.message ?? error.message,
        };
    }
};
