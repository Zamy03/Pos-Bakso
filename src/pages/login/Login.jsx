import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import userData from "../../data/user.json"; // Import user data from JSON

function Login() {
  // State to hold username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch user data from local storage on component mount
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user")) || [];
    // If you want to merge local storage data with userData, you can do it here
    // For example, if localStorageData is an array of users:
    // userData = [...userData, ...localStorageData];
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate the credentials
    const foundUser  = userData.find(user => user.username === username && user.password === password);
    if (foundUser ) {
      alert('Login successful!');
      localStorage.setItem('loggedInUserId', foundUser .id); // Store the user ID
      navigate('/menu'); // Redirect to the dashboard
    } else {
      alert('Invalid username or password'); // Set error message
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