import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from '../data/navbar.js';
import '../css/header.css';
import { navigateTo } from "../utils/navigation.js";

export default function Header() {
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

    return (
        <nav className="site-header">
            <div className="nav-container">

                <div className="logo">
                    <span className="logo-highlight">Task</span>Bridge
                </div>

                <ul className="nav-links">
                    {NAV_LINKS.map(({ id, label, to }) => (
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
                    <button className="btn-login" onClick={() => navigateTo("/login")}>Login</button>
                    <button className="btn-signUp" onClick={() => navigateTo("/signup")}>Sign Up</button>
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
                        {NAV_LINKS.map(({ id, label, to }) => (
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
                        <button className="btn-login" onClick={() => { navigateTo("/login"); close(); }}>Login</button>
                        <button className="btn-signUp" onClick={() => { navigateTo("/signup"); close(); }}>Sign Up</button>
                    </div>
                </div>
            )}
        </nav>
    );
}
