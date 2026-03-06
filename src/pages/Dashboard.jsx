import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getTasksByUser, createTask, getById } from "../services/TaskApi.js";
import "../css/dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", description: "", status: "TODO", priority: "MEDIUM" });
    const [creating, setCreating] = useState(false);
    const [search, setSearch] = useState("");
    const [idResult, setIdResult] = useState(null);
    const [idError, setIdError] = useState(false);
    const [idLoading, setIdLoading] = useState(false);

    const loadTasks = async () => {
        try {
            const data = await getTasksByUser(user.email);
            setTasks(data);
        } catch {
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) loadTasks();
    }, [user]);

    const stats = {
        total: tasks.length,
        todo: tasks.filter(t => t.status === "TODO").length,
        inProgress: tasks.filter(t => t.status === "IN_PROGRESS").length,
        done: tasks.filter(t => t.status === "DONE").length,
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            await createTask(newTask, user.email);
            setNewTask({ title: "", description: "", status: "TODO", priority: "MEDIUM" });
            setShowForm(false);
            await loadTasks();
        } catch {
            alert("Failed to create task");
        } finally {
            setCreating(false);
        }
    };

    const statusClass = { TODO: "todo", IN_PROGRESS: "in-progress", DONE: "done" };

    const q = search.toLowerCase().trim();
    const isIdSearch = /^\d+$/.test(q);

    const localMatches = tasks.filter(t => {
        if (!q) return true;
        return (
            String(t.id) === q ||
            t.title?.toLowerCase().includes(q) ||
            t.description?.toLowerCase().includes(q)
        );
    });

    useEffect(() => {
        setIdResult(null);
        setIdError(false);
        if (!isIdSearch || !q || localMatches.length > 0) return;

        setIdLoading(true);
        getById(q)
            .then(data => setIdResult(data))
            .catch(() => setIdError(true))
            .finally(() => setIdLoading(false));
    }, [q]);

    const searchedTasks = idResult && !localMatches.find(t => String(t.id) === q)
        ? [...localMatches, idResult]
        : localMatches;

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <div>
                    <h1>Welcome back, <span className="user-name">{user?.name || user?.email}</span></h1>
                    <p className="dashboard-subtitle">Here's what's on your plate today.</p>
                </div>
                <button className="btn-create" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "+ New Task"}
                </button>
            </div>

            {showForm && (
                <div className="create-task-form">
                    <h3>Create New Task</h3>
                    <form onSubmit={handleCreate}>
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="Task title *"
                                value={newTask.title}
                                onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                                required
                            />
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
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>
                        <textarea
                            placeholder="Description (optional)"
                            value={newTask.description}
                            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            rows={3}
                        />
                        <button type="submit" disabled={creating}>
                            {creating ? "Creating..." : "Create Task"}
                        </button>
                    </form>
                </div>
            )}

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-number">{stats.total}</span>
                    <span className="stat-label">Total Tasks</span>
                </div>
                <div className="stat-card todo">
                    <span className="stat-number">{stats.todo}</span>
                    <span className="stat-label">To Do</span>
                </div>
                <div className="stat-card in-progress">
                    <span className="stat-number">{stats.inProgress}</span>
                    <span className="stat-label">In Progress</span>
                </div>
                <div className="stat-card done">
                    <span className="stat-number">{stats.done}</span>
                    <span className="stat-label">Done</span>
                </div>
            </div>

            <div className="recent-tasks">
                <div className="recent-tasks-header">
                    <h2>Recent Tasks</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by title, description or ID..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {search && (
                            <button className="search-clear" onClick={() => setSearch("")}>×</button>
                        )}
                    </div>
                </div>

                {loading ? (
                    <p className="loading-text">Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <div className="empty-state">
                        <p>No tasks yet. Create your first task to get started!</p>
                    </div>
                ) : idLoading ? (
                    <p className="loading-text">Searching...</p>
                ) : searchedTasks.length === 0 ? (
                    <div className="empty-state">
                        <p>{idError ? `No task found with ID "${search}".` : `No tasks matching "${search}".`}</p>
                    </div>
                ) : (
                    <div className="task-list">
                        {(search ? searchedTasks : tasks.slice(0, 5)).map(task => (
                            <div
                                key={task.id}
                                className="task-card"
                                onClick={() => navigate(`/tasks/${task.id}`, { state: { task } })}
                            >
                                <div className="task-card-left">
                                    <h4>{task.title}</h4>
                                    {task.description && <p>{task.description}</p>}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                                    <span className="task-id">#{task.id}</span>
                                    <span className={`status-badge ${statusClass[task.status] || ""}`}>
                                        {task.status?.replace("_", " ")}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {!search && tasks.length > 5 && (
                    <button className="view-all-btn" onClick={() => navigate("/tasks")}>
                        View all {tasks.length} tasks →
                    </button>
                )}
            </div>

        </div>
    );
}
