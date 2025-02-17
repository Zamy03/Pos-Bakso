import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests
import { useAuth } from "../../components/auth";

function Login() {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error message

  const navigate = useNavigate();
  const { setLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { token } = response.data; // Extract JWT token from the response

      // Save the token in localStorage
      localStorage.setItem("auth_token", token); // Store the token in localStorage

      alert("Login successful!");
      setLogin(); // Update authentication state
      navigate("/dashboard"); // Redirect to the menu/dashboard
    } catch (error) {
      console.error("Login error: ", error);
      setError("Invalid email or password"); // Set error message
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email} // Bind value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password} // Bind value to state
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          <p className="redirect-message">
            Belum punya akun?{" "}
            <Link to="/regist" className="register-link">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;