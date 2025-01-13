import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TambahPelanggan() {
    const [newPelanggan, setNewPelanggan] = useState({
        nama: "",
        alamat: "",
        telepon: "",
    });
    const [editingIndex, setEditingIndex] = useState(null); // ID pelanggan yang sedang diedit
    const navigate = useNavigate(); // Hook untuk navigasi
    const location = useLocation(); // Untuk membaca data navigasi

    // Ambil data pelanggan dari state navigasi (jika ada)
    useEffect(() => {
        if (location.state) {
            const { data, index } = location.state;

            // Pastikan data valid sebelum mengatur state
            if (data && index !== undefined) {
                setEditingIndex(index); // Simpan ID pelanggan yang diedit
                setNewPelanggan(data); // Isi form dengan data pelanggan
            }
        }
    }, [location.state]);

    // Fungsi untuk menangani perubahan pada input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPelanggan({
            ...newPelanggan,
            [name]: value,
        });
    };

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi input
        if (!newPelanggan.nama || !newPelanggan.alamat || !newPelanggan.telepon) {
            alert("Semua kolom harus diisi!");
            return;
        }

        try {
            // Jika sedang mengedit pelanggan
            if (editingIndex !== null) {
                const response = await fetch(`http://localhost:3000/pelanggan/update/${editingIndex}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Tambahkan token jika diperlukan
                    },
                    body: JSON.stringify(newPelanggan),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to update pelanggan");
                }

                alert("Pelanggan berhasil diperbarui!");
            } else {
                // Jika menambah pelanggan baru
                const response = await fetch("http://localhost:3000/pelanggan", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Tambahkan token jika diperlukan
                    },
                    body: JSON.stringify(newPelanggan),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to add pelanggan");
                }

                alert("Pelanggan berhasil ditambahkan!");
            }

            // Reset form dan navigasi kembali
            setNewPelanggan({
                nama: "",
                alamat: "",
                telepon: "",
            });
            navigate("/pelanggan");
        } catch (error) {
            console.error("Error:", error.message);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="add-pelanggan-form">
            <h2>{editingIndex !== null ? "Edit Pelanggan" : "Tambah Pelanggan"}</h2>
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
                        name="telepon"
                        value={newPelanggan.telepon}
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
