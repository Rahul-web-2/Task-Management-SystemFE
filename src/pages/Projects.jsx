import "../css/projects.css";

export default function Projects() {
    return (
        <div className="projects-page">
            <div className="projects-header">
                <div>
                    <h1>Projects</h1>
                    <p>Manage your projects here</p>
                </div>
            </div>
            <div className="projects-coming-soon">
                <div className="coming-soon-icon">📁</div>
                <h2>Coming Soon</h2>
                <p>Project management features are under development.</p>
            </div>
        </div>
    );
}
