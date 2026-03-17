import { useState } from "react";
import { login } from "../services/LoginApi.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../css/login.css";

export default function Login() {

    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setNotFound(false);

        try {
            const data = await login(user); // ✅ correct call

            // ✅ save user in context
            authLogin(data.user);

            // ✅ redirect
            navigate("/dashboard");

        } catch (err) {

            // ✅ handle backend messages
            if (err.message === "USER_NOT_FOUND") {
                setNotFound(true);
            } else if (err.message === "INVALID_CREDENTIALS") {
                setError("Invalid email or password");
            } else {
                setError("Server error");
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

                {/* ✅ USER NOT FOUND */}
                {notFound && (
                    <p className="form-error">
                        No account found.{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                )}

                {/* ✅ INVALID PASSWORD */}
                {error && (
                    <p className="form-error">{error}</p>
                )}

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}