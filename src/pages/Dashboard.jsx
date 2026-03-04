import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getById} from "../services/TaskApi.js"
import "../css/dashboard.css";

export default function Dashboard() {
const navigate = useNavigate();

    const [taskId, setTaskId] = useState("");
    const [task, setTask] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!taskId) {
            setTask(null);
            setError("");
            return;
        }

        const fetchTask = async () => {
            try {
                const data = await getById(taskId);
                setTask(data);
                setError("");
            } catch (err) {
                setTask(null);
                setError("Task not found");
            }
        };

        fetchTask();
    }, [taskId]);

    return (
        <div className="container">
            <div className="test">
                <h1>Hi 👋</h1>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter Task ID"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                {task && (
                    <div onClick={() =>
            navigate(`/tasks/${task.id}`, {
                state: { task }
            })
        }>
                        <h3>{task.title}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}