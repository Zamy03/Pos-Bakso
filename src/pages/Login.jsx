import React from "react";

function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form>
            <div className="input-group">
              <label htmlFor="username">Username/Email</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
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
