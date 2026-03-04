import { useNavigate } from "react-router-dom";
import { NAV_LINKS2 } from '../data/navbar.js';
import { NavLink } from "react-router-dom";
import '../css/header.css';

export default function Header() {
    const navigate = useNavigate();
    return (
        <nav className='site-header'>
            <div className='nav-container'>

                <div className="logo">
                    <span className="logo-highlight">Task</span>Bridge
                </div>

                <ul className='nav-links'>
                    {NAV_LINKS2.map(({ id, label, to }) => (
                        <li key={id}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    isActive ? "nav-active" : ""
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                 <div className='nav-btn'>
                    <button className="btn-login" onClick={() => navigate("/")}>Log Out</button>
                </div>

            </div>
        </nav>
    )
}