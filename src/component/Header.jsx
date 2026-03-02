import { useNavigate } from "react-router-dom";
import { NAV_LINKS } from '../data/navbar.js';
import Logo from '../assets/logo.png';

import '../css/header.css';

export default function Header() {
    const navigate = useNavigate();
    return (
        <header className='site-header'>
            <div className='header-container'>
                <nav className='header-navigation'>
                    <img
                        src={Logo}
                        alt='Logo of the website TaskBridge'
                        width={150}
                        height={150}
                    />

                    <ul id='header-link'>
                        {NAV_LINKS.map(({ id, label, href }) =>
                            <li key={id}>
                                <a
                                    className='header-link'
                                    href={href}
                                >
                                    {label}
                                </a>
                            </li>
                        )}
                    </ul>

                    <div className='header-btn'>
                        <button onClick={() => navigate("/login")}>Login</button>
                        <button onClick={() => navigate("/signup")}>Sign Up</button>
                    </div>

                </nav>
            </div>
        </header>
    )
}