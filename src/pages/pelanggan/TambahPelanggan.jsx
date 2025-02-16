import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TambahPelanggan() {
    const [newPelanggan, setNewPelanggan] = useState({
        nama: "",
        alamat: "",
        no_hp: "", // Mengganti "telepon" menjadi "no_hp" sesuai dengan struktur di backend
    });
    const [editingIndex, setEditingIndex] = useState(null); // Indeks pelanggan yang sedang diedit
    const navigate = useNavigate(); // Hook untuk navigasi
    const location = useLocation(); // Untuk membaca data navigasi

    // Ambil data pelanggan dari state navigasi (jika ada)
    useEffect(() => {
        if (location.state) {
            const { data, index } = location.state;
            setNewPelanggan(data);
            setEditingIndex(index);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPelanggan({
            ...newPelanggan,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Ambil token dari localStorage
            const token = localStorage.getItem("auth_token");
            if (!token) {
                throw new Error("Token not found. Please log in first.");
            }

            const response = await fetch("http://localhost:3000/pelanggan/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header Authorization
                },
                body: JSON.stringify(newPelanggan),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add pelanggan");
            }

            if (editingIndex !== null) {
                alert("Pelanggan berhasil diperbarui!");
            } else {
                alert("Pelanggan berhasil ditambahkan!");
            }

            // Reset form
            setNewPelanggan({
                nama: "",
                alamat: "",
                no_hp: "",
            });

            // Navigasi kembali ke halaman daftar pelanggan
            navigate("/pelanggan");
        } catch (error) {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="add-pelanggan-form">
            <h2>Tambah Pelanggan</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nama Pelanggan:
                    <input
                        type="text"
                        name="nama"
                        value={newPelanggan.nama}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Alamat:
                    <input
                        type="text"
                        name="alamat"
                        value={newPelanggan.alamat}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    No. Telepon:
                    <input
                        type="text"
                        name="no_hp"
                        value={newPelanggan.no_hp}
                        onChange={handleChange}
                        required
                    />
                </label>
                <div className="button-group">
                    <button type="submit" className="save-button">
                        {editingIndex !== null ? "Update Pelanggan" : "Simpan Pelanggan"}
                    </button>
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/pelanggan")}
                    >
                        Kembali
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TambahPelanggan;
