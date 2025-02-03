import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function Pelanggan() {
  const [pelanggan, setPelanggan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data pelanggan dari API
    async function fetchPelanggan() {
      try {
        const response = await fetch("http://localhost:3000/pelanggan/all");
        if (!response.ok) {
          throw new Error("Failed to fetch pelanggan data");
        }
        const data = await response.json();
        setPelanggan(data);
      } catch (error) {
        console.error("Error fetching pelanggan data:", error);
      }
    }

    fetchPelanggan();
  }, []);

  let no = 1;

  return (
    <Layout>
      <div className="pelanggan">
        <div className="pelanggan-header">
          <h2>Daftar Pelanggan</h2>
          <button
            className="add-pelanggan-btn"
            onClick={() => navigate("/update-pelanggan")}
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
            {pelanggan.length > 0 ? (
              pelanggan.map((data, index) => {
                return (
                  <tr key={data.id || index}>
                    <td data-label="No">{no++}</td>
                    <td data-label="Nama Pelanggan">{data.nama || "Tidak Diketahui"}</td>
                    <td data-label="Alamat">{data.alamat || "Tidak Diketahui"}</td>
                    <td data-label="No. Telepon">{data.no_hp || "Tidak Tersedia"}</td>
                    <td data-label="Aksi">
                      <button onClick={() => handleEdit(data.id)}>Edit</button>
                      <button onClick={() => handleDelete(data.id)}>Hapus</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Data pelanggan tidak tersedia</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );

  function handleEdit(id) {
    const selectedPelanggan = pelanggan.find((item) => item.id === id);
    navigate("/update-pelanggan", { state: { pelanggan: selectedPelanggan, id } });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pelanggan ini?");
    if (!confirmDelete) return;

    try {
        const token = localStorage.getItem("auth_token"); // Ambil token dari localStorage
        if (!token) {
            throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }

        const response = await fetch(`http://localhost:3000/pelanggan/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,  // Kirim token dalam header
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete pelanggan");
        }

        // Update state setelah penghapusan
        const updatedPelanggan = pelanggan.filter((item) => item.id !== id);
        setPelanggan(updatedPelanggan);
        alert("Pelanggan berhasil dihapus!");
    } catch (error) {
        console.error("Error deleting pelanggan:", error);
        alert(`Terjadi kesalahan saat menghapus pelanggan: ${error.message}`);
    }
}

}

export default Pelanggan;