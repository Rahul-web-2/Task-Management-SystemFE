import { useState, useEffect } from "react";
import { login } from "../services/LoginApi.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../css/login.css";

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

export default function Login() {

    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [notFound, setNotFound] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [lockUntil, setLockUntil] = useState(0);
    const [countdown, setCountdown] = useState(0);

    // countdown timer
    useEffect(() => {
        if (lockUntil <= Date.now()) return;

        const interval = setInterval(() => {
            const remaining = Math.ceil((lockUntil - Date.now()) / 1000);

            if (remaining <= 0) {
                setCountdown(0);
                clearInterval(interval);
            } else {
                setCountdown(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);

    }, [lockUntil]);

    // input change
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

        // reset errors when typing
        setError("");
        setNotFound(false);
    };

    // form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (countdown > 0) return;

        try {

            const data = await login(user);

            setAttempts(0);
            setNotFound(false);

            authLogin(data);

            navigate("/dashboard");

        } catch (err) {

            if (err.message === "USER_NOT_FOUND" || err.message === "User not found") {
                setNotFound(true);
                setError("");
                return;
            }

            setNotFound(false);

            const newAttempts = attempts + 1;

            setAttempts(newAttempts);

            if (newAttempts >= MAX_ATTEMPTS) {

                const until = Date.now() + LOCKOUT_SECONDS * 1000;

                setLockUntil(until);
                setCountdown(LOCKOUT_SECONDS);
                setAttempts(0);

                setError(`Too many failed attempts. Try again in ${LOCKOUT_SECONDS}s.`);

            } else {

                setError(`Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempt(s) remaining.`);
            }
        }
    };

    return (
        <div className="login-page">

            <form className="login-form" onSubmit={handleSubmit}>

                <h2>Welcome back</h2>

                <div className="form-group">
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {notFound && (
                    <p className="form-error">
                        No account found. <Link to="/signup">Create an account</Link>
                    </p>
                )}

                {error && (
                    <p className="form-error">{error}</p>
                )}

                <button type="submit" disabled={countdown > 0}>
                    {countdown > 0 ? `Try again in ${countdown}s` : "Login"}
                </button>

            </form>

        </div>
    );
}