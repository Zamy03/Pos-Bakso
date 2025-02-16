import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function BahanBaku() {
  const [bahanBaku, setBahanBaku] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data bahan baku dari API
    async function fetchBahanBaku() {
      try {
        const response = await fetch("http://localhost:3000/bahan/all");
        if (!response.ok) {
          throw new Error("Failed to fetch bahan baku data");
        }
        const data = await response.json();
        setBahanBaku(data);
      } catch (error) {
        console.error("Error fetching bahan baku data:", error);
      }
    }

    fetchBahanBaku();
  }, []);

  let no = 1;

  return (
    <Layout>
      <div className="bahan-baku">
        <div className="bahan-baku-header">
          <h2>Daftar Bahan Baku</h2>
          <button
            className="add-bahan-btn"
            onClick={() => navigate("/update-bahan")}
          >
            Tambah Bahan Baku
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Bahan</th>
              <th>Stok</th>
              <th>Satuan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bahanBaku.length > 0 ? (
              bahanBaku.map((data, index) => {
                return (
                  <tr key={data.id_bahan || index}>
                    <td data-label="No">{no++}</td>
                    <td data-label="Nama Bahan">{data.nama_bahan || "Tidak Diketahui"}</td>
                    <td data-label="Stok">{data.stok || "Tidak Diketahui"}</td>
                    <td data-label="Satuan">{data.satuan || "Tidak Tersedia"}</td>
                    <td data-label="Aksi">
                      <button onClick={() => handleEdit(data.id_bahan)}>Edit</button>
                      <button onClick={() => handleDelete(data.id_bahan)}>Hapus</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Data bahan baku tidak tersedia</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );

  function handleEdit(id) {
    const selectedBahan = bahanBaku.find((item) => item.id_bahan === id);
    navigate("/update-bahan", { state: { bahan: selectedBahan, id } });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus bahan baku ini?");
    if (!confirmDelete) return;

    try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }

        const response = await fetch(`http://localhost:3000/bahan/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete bahan baku");
        }

        // Update state setelah penghapusan
        const updatedBahanBaku = bahanBaku.filter((item) => item.id_bahan !== id);
        setBahanBaku(updatedBahanBaku);
        alert("Bahan baku berhasil dihapus!");
    } catch (error) {
        console.error("Error deleting bahan baku:", error);
        alert(`Terjadi kesalahan saat menghapus bahan baku: ${error.message}`);
    }
}

}

export default BahanBaku;