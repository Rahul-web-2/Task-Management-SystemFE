import { navigateTo } from "../utils/navigation";
import '../css/home.css';

export default function Home() {

    return (
        <div className="home">

            {/* Hero */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Bridge the Gap Between <span className="highlight">Plans</span> and Progress
                    </h1>
                    <p className="hero-subtitle">
                        TaskBridge helps teams organize work, track progress, and deliver results — all in one place.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => navigateTo("/signup")}>
                            Get Started Free
                        </button>
                        <button className="btn-secondary" onClick={() => navigateTo("/about")}>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features">
                <h2>Everything You Need to Stay on Track</h2>
                <p className="features-subtitle">Simple tools that get out of the way and let you ship.</p>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">✓</div>
                        <h3>Task Tracking</h3>
                        <p>Create, assign, and monitor tasks with ease. Never lose track of what matters most.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⟳</div>
                        <h3>Real-time Updates</h3>
                        <p>Stay in sync with your team. See progress as it happens across all your work.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">◎</div>
                        <h3>Team Collaboration</h3>
                        <p>Work together seamlessly. Share tasks, updates, and results with your whole team.</p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h4>Create an Account</h4>
                        <p>Sign up in seconds and start organizing your work immediately.</p>
                    </div>
                    <div className="step-divider" />
                    <div className="step">
                        <div className="step-number">2</div>
                        <h4>Add Your Tasks</h4>
                        <p>Create tasks, set priorities, and add descriptions to keep everyone aligned.</p>
                    </div>
                    <div className="step-divider" />
                    <div className="step">
                        <div className="step-number">3</div>
                        <h4>Track Progress</h4>
                        <p>Monitor status, update tasks, and celebrate when things get done.</p>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner">
                <h2>Ready to Get Organized?</h2>
                <p>Join teams already using TaskBridge to ship faster.</p>
                <button className="btn-primary" onClick={() => navigateTo("/signup")}>
                    Start for Free
                </button>
            </section>

        </div>
    );
}
