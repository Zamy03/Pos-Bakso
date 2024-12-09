import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TambahPelanggan() {
    const [newPelanggan, setNewPelanggan] = useState({
        nama: "",
        alamat: "",
        telepon: "",
    });
    const [editingIndex, setEditingIndex] = useState(null); // Indeks pelanggan yang sedang diedit
    const navigate = useNavigate(); // Hook untuk navigasi
    const location = useLocation(); // Untuk membaca data navigasi

    // Ambil data pelanggan dari state navigasi (jika ada)
    useEffect(() => {
        if (location.state) {
            const { data, index } = location.state;
            console.log("Editing Data:", data);
            console.log("Editing Index:", index);
    
            // Pastikan data valid sebelum mengatur state
            if (data && index !== undefined) {
                setEditingIndex(index);
            }
        }
    }, [location.state]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validasi input
        if (!newPelanggan.nama || !newPelanggan.alamat || !newPelanggan.telepon) {
            alert("Semua kolom harus diisi!");
            return;
        }
    
        // Ambil data pelanggan yang sudah ada
        const existingPelanggan = JSON.parse(localStorage.getItem("pelanggan")) || [];
    
        if (editingIndex !== null) {
            // Update data pelanggan di indeks yang sesuai
            existingPelanggan[editingIndex] = newPelanggan;
            alert("Pelanggan berhasil diperbarui!");
        } else {
            // Tambahkan pelanggan baru
            existingPelanggan.push(newPelanggan);
            alert("Pelanggan berhasil ditambahkan!");
        }
    
        // Simpan perubahan ke localStorage
        localStorage.setItem("pelanggan", JSON.stringify(existingPelanggan));
    
        // Reset form dan navigasi kembali
        setNewPelanggan({
            nama: "",
            alamat: "",
            telepon: "",
        });
        navigate("/pelanggan");
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
