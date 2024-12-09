import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import pelangganData from "../../data/pelanggan.json";
import { useNavigate } from "react-router-dom";

function Pelanggan() {
    const [pelanggan, setPelanggan] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("pelanggan")) || [];
        const validData = localStorageData.filter(
            (item) => item && item.nama && item.alamat && item.telepon
        ); // Hanya ambil data yang valid
        setPelanggan([...pelangganData, ...validData]);
    }, []);
    

    // Fungsi untuk menghapus data pelanggan
    const handleDelete = (index) => {
        const updatedPelanggan = [...pelanggan];
        updatedPelanggan.splice(index, 1);
        setPelanggan(updatedPelanggan);
        localStorage.setItem("pelanggan", JSON.stringify(updatedPelanggan));
    };

    // Fungsi untuk navigasi ke halaman edit pelanggan
    const handleEdit = (index) => {
        navigate("/tambah-pelanggan", {
            state: { data: pelanggan[index], index },
        });
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
        if (!data || !data.nama || !data.alamat || !data.telepon) {
            // Skip data yang tidak valid
            return null;
        }

        return (
            <tr key={index}>
                <td data-label="No">{index + 1}</td>
                <td data-label="Nama Pelanggan">{data.nama}</td>
                <td data-label="Alamat">{data.alamat}</td>
                <td data-label="No. Telepon">{data.telepon}</td>
                <td data-label="Aksi">
                    <button onClick={() => handleDelete(index)}>Hapus</button>
                    <button onClick={() => handleEdit(index)}>Update</button>
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
