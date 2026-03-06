import { useState } from "react";
import { login } from "../services/LoginApi.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import '../css/login.css'


export default function Login() {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(user);
            authLogin(data);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Error in login user");
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
                <button type="submit">Login</button>

            </form>
        </div>
    )
}