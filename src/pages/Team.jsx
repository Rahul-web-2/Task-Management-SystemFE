import { useState, useEffect } from "react";
import { getUser } from "../services/SignUpApi.js";
import "../css/team.css";

export default function Team() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getUser()
            .then(data => setMembers(data))
            .catch(() => setMembers([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = members.filter(m => {
        const q = search.toLowerCase();
        return !q || m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q);
    });

    const initials = (name) =>
        name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";

    return (
        <div className="team-page">

            <div className="team-header">
                <div>
                    <h1>Team</h1>
                    <p>{members.length} member{members.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="search-clear" onClick={() => setSearch("")}>×</button>
                    )}
                </div>
            </div>

            {loading ? (
                <p className="loading-text">Loading team...</p>
            ) : filtered.length === 0 ? (
                <div className="empty-state">
                    <p>{search ? `No members matching "${search}".` : "No team members found."}</p>
                </div>
            ) : (
                <div className="team-grid">
                    {filtered.map((member, idx) => (
                        <div key={member.id || idx} className="member-card">
                            <div className="member-avatar">{initials(member.name)}</div>
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-email">{member.email}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
