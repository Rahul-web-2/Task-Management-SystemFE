import axios from "axios";

const API = import.meta.env.VITE_API;

const api = axios.create({
    baseURL: API,
    withCredentials: true,
});

export const createUser = async (userData) => {
    try {
        const { data } = await api.post(`${API}/api/auth/signUp`, userData);
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
        const { data } = await aip.get(`${API}/api/auth`);
        return data;
    } catch (error) {
        throw {
            status: error.response?.status,
            message: error.response?.data?.message ?? error.message,
        };
    }
};
