import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { createUser } from "../services/SignUpApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../css/signUp.css";

export default function SignUp() {

  const navigate = useNavigate();
  const { login: authLogin, user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace />;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createUser(formData);
      authLogin(data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error creating user");
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

        <button type="submit">Sign Up</button>

      </form>
    </div>
  );
}