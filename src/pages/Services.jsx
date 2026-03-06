import { useNavigate } from "react-router-dom";
import '../css/services.css';
import { SERVICES } from '../data/servicedata.js';

export default function Services() {
    const navigate = useNavigate();

    return (
        <div className="services-page">

            <section className="services-hero">
                <h1>Our <span className="highlight">Services</span></h1>
                <p>Everything your team needs to move from idea to done.</p>
            </section>

            <section className="services-grid-section">
                <div className="services-grid">
                    {SERVICES.map(s => (
                        <div key={s.id} className="service-card">
                            <div className="service-icon">{s.icon}</div>
                            <h3>{s.title}</h3>
                            <p>{s.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="services-cta">
                <h2>Ready to Try It Out?</h2>
                <p>Sign up free and start organizing your team today.</p>
                <button className="btn-primary" onClick={() => navigate("/signup")}>
                    Get Started
                </button>
            </section>

        </div>
    );
}
