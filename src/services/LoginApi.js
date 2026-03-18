import axios from "axios";

const API = import.meta.env.VITE_API;

export const login = async (user) => {
    try {
        const { data } = await axios.post(`${API}/api/users/Login`, user);
        return data;
    } catch (error) {
        throw error.response?.data ?? error;
    }
};
