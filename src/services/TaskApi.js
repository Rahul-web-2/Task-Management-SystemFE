import api from "./api";

export const createTask = async (task) => {
    const { data } = await api.post("/api/tasks/create", task);
    return data;
};

export const getById = async (id) => {
    const { data } = await api.get(`/api/tasks/${id}`);
    return data;
};

export const getTasksByUser = async () => {
    const { data } = await api.get("/api/tasks");
    return data;
};

export const updateTask = async (id, task) => {
    const { data } = await api.put(`/api/tasks/update/${id}`, task);
    return data;
};

export const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
};
