import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [nama, setNama] = useState('');
    const [noHp, setNoHp] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Data yang akan dikirim ke endpoint
        const userData = {
            nama,
            no_hp: noHp, // Sesuai dengan nama field di endpoint
            email,
            password,
        };

        try {
            // Kirim permintaan POST ke endpoint register
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || 'Pendaftaran berhasil!');
                // Redirect ke halaman login setelah pendaftaran berhasil
                navigate('/');
            } else {
                // Tampilkan pesan error jika ada
                alert(result.message || 'Pendaftaran gagal!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan, silakan coba lagi.');
        }

        // Clear form fields setelah submit
        setNama('');
        setNoHp('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="registContainer">
            <form className="registForm" onSubmit={handleSubmit}>
                <h1 className="registHeading">Register</h1>
                <div>
                    <label className="registLabel">Nama:</label>
                    <input
                        className="registInput"
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="registLabel">No HP:</label>
                    <input
                        className="registInput"
                        type="text"
                        value={noHp}
                        onChange={(e) => setNoHp(e.target.value)}
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
