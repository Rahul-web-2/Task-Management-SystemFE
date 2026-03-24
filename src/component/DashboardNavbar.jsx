import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS2 } from '../data/navbar.js';
import { useAuth } from "../context/AuthContext.jsx";
import '../css/header.css';
import { navigateTo } from "../utils/navigation.js";

export default function DashboardNavbar() {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

    const handleLogout = async () => {
        await logout();
        navigateTo("/login");
        close();
    };

    return (
        <nav className="site-header">
            <div className="nav-container">

                <div className="logo">
                    <span className="logo-highlight">Task</span>Bridge
                </div>

                <ul className="nav-links">
                    {NAV_LINKS2.map(({ id, label, to }) => (
                        <li key={id}>
                            <NavLink
                                to={to}
                                className={({ isActive }) => isActive ? "nav-active" : ""}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="nav-btn">
                    <button className="btn-login" onClick={handleLogout}>Log Out</button>
                </div>

                <button
                    className="hamburger"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span className={`bar ${open ? "open" : ""}`} />
                    <span className={`bar ${open ? "open" : ""}`} />
                    <span className={`bar ${open ? "open" : ""}`} />
                </button>

            </div>

            {open && (
                <div className="mobile-menu">
                    <ul className="mobile-nav-links">
                        {NAV_LINKS2.map(({ id, label, to }) => (
                            <li key={id}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) => isActive ? "nav-active" : ""}
                                    onClick={close}
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="mobile-nav-btn">
                        <button className="btn-login" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            )}
        </nav>
    );
}
