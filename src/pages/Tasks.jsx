import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getTasksByUser, createTask, deleteTask } from "../services/TaskApi.js";
import "../css/tasks.css";

const STATUSES = ["ALL", "TODO", "IN_PROGRESS", "DONE"];

export default function Tasks() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", description: "", status: "TODO", priority: "MEDIUM" });
    const [creating, setCreating] = useState(false);

    const loadTasks = async () => {
        try {
            const data = await getTasksByUser(user.id);
            setTasks(data);
        } catch {
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) loadTasks();
    }, [user]);

    const filtered = filter === "ALL" ? tasks : tasks.filter(t => t.status === filter);

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            await createTask(newTask, user.id);
            setNewTask({ title: "", description: "", status: "TODO", priority: "MEDIUM" });
            setShowForm(false);
            await loadTasks();
        } catch {
            alert("Failed to create task");
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!confirm("Delete this task?")) return;
        try {
            await deleteTask(id);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch {
            alert("Failed to delete task");
        }
    };

    const statusClass = { TODO: "todo", IN_PROGRESS: "in-progress", DONE: "done" };
    const priorityClass = { LOW: "low", MEDIUM: "medium", HIGH: "high" };

    return (
        <div className="tasks-page">

            <div className="tasks-header">
                <div>
                    <h1>Tasks</h1>
                    <p>{tasks.length} task{tasks.length !== 1 ? "s" : ""} total</p>
                </div>
                <button className="btn-create" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "+ New Task"}
                </button>
            </div>

            {showForm && (
                <div className="create-form">
                    <h3>New Task</h3>
                    <form onSubmit={handleCreate}>
                        <input
                            type="text"
                            placeholder="Task title *"
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description (optional)"
                            value={newTask.description}
                            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            rows={3}
                        />
                        <div className="form-selects">
                            <select
                                value={newTask.status}
                                onChange={e => setNewTask({ ...newTask, status: e.target.value })}
                            >
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                            <select
                                value={newTask.priority}
                                onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                            >
                                <option value="LOW">Low Priority</option>
                                <option value="MEDIUM">Medium Priority</option>
                                <option value="HIGH">High Priority</option>
                            </select>
                        </div>
                        <button type="submit" disabled={creating}>
                            {creating ? "Creating..." : "Create Task"}
                        </button>
                    </form>
                </div>
            )}

            <div className="filter-tabs">
                {STATUSES.map(s => (
                    <button
                        key={s}
                        className={`filter-tab ${filter === s ? "active" : ""}`}
                        onClick={() => setFilter(s)}
                    >
                        {s === "ALL" ? "All" : s.replace("_", " ")}
                        <span className="count">
                            {s === "ALL" ? tasks.length : tasks.filter(t => t.status === s).length}
                        </span>
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="loading-text">Loading tasks...</p>
            ) : filtered.length === 0 ? (
                <div className="empty-state">
                    <p>
                        {filter === "ALL"
                            ? "No tasks yet. Create one to get started!"
                            : `No ${filter.replace("_", " ")} tasks.`}
                    </p>
                </div>
            ) : (
                <div className="tasks-list">
                    {filtered.map(task => (
                        <div
                            key={task.id}
                            className="task-item"
                            onClick={() => navigate(`/tasks/${task.id}`, { state: { task } })}
                        >
                            <div className="task-item-main">
                                <h4>{task.title}</h4>
                                {task.description && <p className="task-desc">{task.description}</p>}
                            </div>
                            <div className="task-item-meta">
                                {task.priority && (
                                    <span className={`priority-badge ${priorityClass[task.priority] || ""}`}>
                                        {task.priority}
                                    </span>
                                )}
                                <span className={`status-badge ${statusClass[task.status] || ""}`}>
                                    {task.status?.replace("_", " ")}
                                </span>
                                <button
                                    className="delete-btn"
                                    onClick={(e) => handleDelete(e, task.id)}
                                    title="Delete task"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
