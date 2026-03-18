import axios from "axios";

const API = import.meta.env.VITE_API;

const JSON_HEADERS = { "Content-Type": "application/json" };

export const createTask = async (task, userEmail) => {
    const { data } = await axios.post(
        `${API}/api/tasks/user/${encodeURIComponent(userEmail)}`,
        task,
        { headers: JSON_HEADERS }
    );
    return data;
};

export const getById = async (id) => {
    const { data } = await axios.get(`${API}/api/tasks/${id}`);
    return data;
};

export const getTasksByUser = async (userEmail) => {
    const { data } = await axios.get(
        `${API}/api/tasks/user/${encodeURIComponent(userEmail)}`
    );
    return data;
};

export const updateTask = async (id, task) => {
    const { data } = await axios.put(
        `${API}/api/tasks/update/${id}`,
        task,
        { headers: JSON_HEADERS }
    );
    return data;
};

export const deleteTask = async (id) => {
    await axios.delete(`${API}/api/tasks/${id}`);
};
