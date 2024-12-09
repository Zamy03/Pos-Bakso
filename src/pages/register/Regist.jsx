import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [nohp, setNohp] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Store user data in local storage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('nohp', nohp);
        localStorage.setItem('password', password);
        
        alert('Pendaftaran berhasil!');
        
        // Optionally, clear the form fields
        setUsername('');
        setEmail('');
        setNohp('');
        setPassword('');

        // Redirect to the login page
        navigate('/'); // Change '/login' to your actual login route
    };

    return (
        <div className="registContainer">
            <form className="registForm" onSubmit={handleSubmit}>
                <h1 className="registHeading">Register</h1>
                <div>
                    <label className="registLabel">Username:</label>
                    <input
                        className="registInput"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="registLabel">Email:</label>
                    <input
                        className="registInput"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="registLabel">Nohp:</label>
                    <input
                        className="registInput"
                        type="text" // Changed to "text" for phone number
                        value={nohp}
                        onChange={(e) => setNohp(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="registLabel">Password:</label>
                    <input
                        className="registInput"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="registButton" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;