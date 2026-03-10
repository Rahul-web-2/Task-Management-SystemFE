import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { createUser } from "../services/SignUpApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../css/signUp.css";

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

export default function SignUp() {

  const navigate = useNavigate();
  const { login: authLogin, user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace />;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);
  const [countdown, setCountdown] = useState(0);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (countdown > 0) return;

    try {
      const data = await createUser(formData);
      setAttempts(0);
      authLogin(data);
      navigate("/dashboard");
    } catch {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_SECONDS * 1000;
        setLockUntil(until);
        setCountdown(LOCKOUT_SECONDS);
        setAttempts(0);
        setError(`Too many failed attempts. Try again in ${LOCKOUT_SECONDS}s.`);
      } else {
        setError(`Sign up failed. ${MAX_ATTEMPTS - newAttempts} attempt(s) remaining.`);
      }
    }
  };

  return (
    <div className="signUp-page">
      <form className="signUp-form" onSubmit={handleSubmit}>
        <h2>Create an account</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={countdown > 0}>
          {countdown > 0 ? `Try again in ${countdown}s` : "Sign Up"}
        </button>

      </form>
    </div>
  );
}