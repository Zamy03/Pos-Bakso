import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  // State to hold username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hardcoded user data for demonstration
  const userData = {
    username: 'user@example.com',
    password: 'password123',
  };

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate the credentials
    if (username === userData.username && password === userData.password) {
      alert('Login successful!');
      navigate('/menu'); // Redirect to the dashboard
    } else {
      alert('Invalid username or password');
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
              <label htmlFor="username">Username/Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username} // Bind value to state
                onChange={(e) => setUsername(e.target.value)} // Update state on change
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
        </div>
      </div>
    </div>
  );
}

export default Login;