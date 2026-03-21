import axios from "axios";

const API = import.meta.env.VITE_API;

const api = axios.create({
    baseURL: API,
    withCredentials: true, // ✅ send cookies automatically
});

const JSON_HEADERS = { "Content-Type": "application/json" };

// ✅ Create task
export const createTask = async (task) => {
    const { data } = await api.post("/api/tasks", task, { headers: JSON_HEADERS });
    return data;
};

// ✅ Get task by ID
export const getById = async (id) => {
    const { data } = await api.get(`/api/tasks/${id}`);
    return data;
};

// ✅ Get tasks for logged-in user
export const getTasksByUser = async () => {
    const { data } = await api.get("/api/tasks"); // no email
    return data;
};

// ✅ Update task
export const updateTask = async (id, task) => {
    const { data } = await api.put(`/api/tasks/update/${id}`, task, { headers: JSON_HEADERS });
    return data;
};

// ✅ Delete task
export const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
};