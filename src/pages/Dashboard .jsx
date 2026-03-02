import { useLocation } from "react-router-dom";

export default function Dashboard() {

    const location = useLocation();
    const userName = location.state?.name;

    return (
        <div className="test">
            <h1>Hi {userName} 👋</h1>
        </div>
    );
}