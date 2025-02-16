import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TambahBahan() {
    const [newBahan, setNewBahan] = useState({
        nama_bahan: "",
        stok: "",
        satuan: "",
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const { data, index } = location.state;
            setNewBahan(data);
            setEditingIndex(index);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBahan({
            ...newBahan,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                throw new Error("Token not found. Please log in first.");
            }

            const response = await fetch("http://localhost:3000/bahan/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newBahan),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add bahan baku");
            }

            if (editingIndex !== null) {
                alert("Bahan baku berhasil diperbarui!");
            } else {
                alert("Bahan baku berhasil ditambahkan!");
            }

            setNewBahan({
                nama_bahan: "",
                stok: "",
                satuan: "",
            });

            navigate("/bahan-baku");
        } catch (error) {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="add-bahan-form">
            <h2>Tambah Bahan Baku</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nama Bahan:
                    <input
                        type="text"
                        name="nama_bahan"
                        value={newBahan.nama_bahan}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Stok:
                    <input
                        type="number"
                        name="stok"
                        value={newBahan.stok}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Satuan:
                    <input
                        type="text"
                        name="satuan"
                        value={newBahan.satuan}
                        onChange={handleChange}
                        required
                    />
                </label>
                <div className="button-group">
                    <button type="submit" className="save-button">
                        {editingIndex !== null ? "Update Bahan" : "Simpan Bahan"}
                    </button>
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/bahan-baku")}
                    >
                        Kembali
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TambahBahan;