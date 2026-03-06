import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/SignUpApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import '../css/signUp.css';

export default function SignUp() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [user, setUser] = useState({
    name: "",
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
      const data = await createUser(user);
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

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
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
            value={user.email}
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
            value={user.password}
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