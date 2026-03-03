import { useNavigate } from "react-router-dom";
import { NAV_LINKS } from '../data/navbar.js';
import Logo from '../assets/logo.png';

import '../css/header.css';

export default function Header() {
    const navigate = useNavigate();
    return (
        <nav className='site-header'>
            <div className='nav-container'>

                <div class="logo">
                    <span class="logo-highlight">Task</span>Bridge
                </div>

                <ul className='nav-links'>
                    {NAV_LINKS.map(({ id, label, href }) =>
                        <li key={id}>
                            <a
                                href={href}
                            >
                                {label}
                            </a>
                        </li>
                    )}
                </ul>

                <div className='nav-btn'>
                    <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
                    <button className="btn-signUp" onClick={() => navigate("/signup")}>Sign Up</button>
                </div>

            </div>
        </nav>
    )
}