import { useState } from "react";
import { createUser } from "../services/SignUpApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { navigateTo } from "../utils/navigation.js";
import "../css/signUp.css";

export default function SignUp() {

  const { user, login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);


    try {
      const res = await createUser(formData);

      login(res.user);
      navigateTo("/dashboard");

    } catch (err) {

      if (err.status === 409) {
        setError("User already exists. Please login.");
      } else {
        setError("Something went wrong");
      }

    } finally {
      setLoading(false);
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


        {error && (
          <p className="form-error">
            {error}
            {error.includes("User already exists") && (
              <>
                {" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => navigateTo("/login")}
                >
                  Login here
                </span>
              </>
            )}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

      </form>
    </div>
  );
}