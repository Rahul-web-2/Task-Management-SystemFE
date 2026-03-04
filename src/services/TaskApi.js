const API = import.meta.env.VITE_API;

export const createTask = async(task, userEmail) => {
    const response = await fetch(`${API}/api/task/user/${userEmail}`, {
        method: "POST",
        headers: {
             "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    });
     if (!response.ok) {
        throw new Error("Failed to create the task")
    }
    return await response.json();
}

export const getById = async(id) => {
    const response = await fetch(`${API}/api/task/${id}`);
     
    if (!response.ok) {
        throw new Error("Failed to fetch Task");
    }

    return await response.json();
}