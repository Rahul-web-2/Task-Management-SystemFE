import { useState } from "react";
import '../css/contact.css';

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="contact-page">

            <section className="contact-hero">
                <h1>Get in <span className="highlight">Touch</span></h1>
                <p>Have questions or feedback? We'd love to hear from you.</p>
            </section>

            <section className="contact-content">

                <div className="contact-info">
                    <div className="info-item">
                        <div className="info-icon">@</div>
                        <div>
                            <h4>Email</h4>
                            <p>support@taskbridge.io</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-icon">#</div>
                        <div>
                            <h4>Availability</h4>
                            <p>Mon – Fri, 9am – 6pm IST</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-icon">◎</div>
                        <div>
                            <h4>Response Time</h4>
                            <p>We reply within 24 hours</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    {sent ? (
                        <div className="success-msg">
                            <h3>Message Sent!</h3>
                            <p>Thank you for reaching out. We'll be in touch soon.</p>
                            <button onClick={() => setSent(false)}>Send Another</button>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <h2>Send a Message</h2>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    rows={5}
                                    required
                                />
                            </div>
                            <button type="submit">Send Message</button>
                        </form>
                    )}
                </div>

            </section>
        </div>
    );
}
