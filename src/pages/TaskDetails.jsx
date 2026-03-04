import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {getById} from "../services/TaskApi.js"

export default function TaskDetails() {

    const { id } = useParams();
    const location = useLocation();

    const [task, setTask] = useState(location.state?.task || null);

    useEffect(() => {
        if (!task) {
            const fetchTask = async () => {
                const data = await getById(id);
                setTask(data);
            };
            fetchTask();
        }
    }, [id, task]);

    if (!task) return <p>Loading...</p>;

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
        </div>
    );
}