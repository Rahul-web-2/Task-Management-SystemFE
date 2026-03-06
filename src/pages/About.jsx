import '../css/about.css';

export default function About() {
    return (
        <div className="about-page">

            <section className="about-hero">
                <h1>About <span className="highlight">TaskBridge</span></h1>
                <p>We believe great work happens when teams have clarity, focus, and the right tools.</p>
            </section>

            <section className="mission">
                <div className="mission-content">
                    <h2>Our Mission</h2>
                    <p>
                        TaskBridge was built with one goal in mind: make task management simple, transparent, and
                        effective. We noticed teams spending more time managing their work management tools than
                        actually doing the work. So we built something different — a clean, focused platform that
                        gets out of the way and lets you ship faster.
                    </p>
                </div>
            </section>

            <section className="values">
                <h2>What We Stand For</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon">◈</div>
                        <h3>Simplicity</h3>
                        <p>No bloated features. We keep things focused so your team can move fast.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">◉</div>
                        <h3>Transparency</h3>
                        <p>Everyone on the team knows what's happening, what's done, and what's next.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">◇</div>
                        <h3>Reliability</h3>
                        <p>Your data is safe, your tools work, and your team can count on us.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">◎</div>
                        <h3>Collaboration</h3>
                        <p>Built for teams. Everything we ship makes working together easier.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
