import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import pelangganData from "../../data/pelanggan.json";
import { useNavigate } from "react-router-dom";

function Pelanggan() {
    const [pelanggan, setPelanggan] = useState([]);
    const navigate = useNavigate();

    // Fetch data pelanggan dari API
    useEffect(() => {
        const fetchPelanggan = async () => {
            try {
                const response = await fetch("http://localhost:3000/pelanggan/all");
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setPelanggan(data);
            } catch (error) {
                console.error("Error fetching pelanggan:", error);
            }
        };

        fetchPelanggan();
    }, []);
    

    // Fungsi untuk menghapus data pelanggan
    const handleDelete = (index) => {
        const updatedPelanggan = [...pelanggan];
        updatedPelanggan.splice(index, 1);
        setPelanggan(updatedPelanggan);
        localStorage.setItem("pelanggan", JSON.stringify(updatedPelanggan));
    };

// Fungsi untuk navigasi ke halaman edit pelanggan
const handleEdit = async (id) => {
    try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            throw new Error("Token not found. Please log in first.");
        }

        const response = await fetch(`http://localhost:3000/pelanggan/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Tambahkan token untuk autentikasi
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch pelanggan data");
        }

        const pelangganData = await response.json();

        // Navigasi ke halaman tambah pelanggan dengan data yang didapatkan
        navigate("/tambah-pelanggan", {
            state: { data: pelangganData, index: id },
        });
    } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
    }
};
    

    return (
        <Layout>
            <div className="pelanggan">
                <div className="pelanggan-header">
                    <h2>Daftar Pelanggan</h2>
                    <button
                        className="add-pelanggan-btn"
                        onClick={() => navigate("/tambah-pelanggan")}
                    >
                        Tambah Pelanggan
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Pelanggan</th>
                            <th>Alamat</th>
                            <th>No. Telepon</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
        {pelanggan.map((data, index) => {
        
        return (
            <tr key={index}>
                <td data-label="No">{index + 1}</td>
                <td data-label="Nama Pelanggan">{data.nama}</td>
                <td data-label="Alamat">{data.alamat}</td>
                <td data-label="No. Telepon">{data.no_hp}</td>
                <td data-label="Aksi">
                    <button onClick={() => handleDelete(index)}>Hapus</button>
                    <button onClick={() => handleEdit(data.id)}>Update</button>
                </td>
            </tr>
        );
    })}
</tbody>

                </table>
            </div>
        </Layout>
    );
}

export default Pelanggan;
