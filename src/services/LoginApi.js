import axios from "axios";

const API = import.meta.env.VITE_API;

const api = axios.create({
    baseURL: API,
    withCredentials: true,
});

export const login = async (user) => {
    try {
        const { data } = await api.post(`${API}/api/auth/login`, user);
        return data;
    } catch (error) {
        throw error.response?.data ?? error;
    }
};

