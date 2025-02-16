import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function Reservasi() {
  const [reservasi, setReservasi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReservasi() {
      try {
        const response = await fetch("http://localhost:3000/api/reservasi");
        if (!response.ok) throw new Error("Failed to fetch reservasi data");
        const data = await response.json();
        setReservasi(data);
      } catch (error) {
        console.error("Error fetching reservasi data:", error);
      }
    }
    fetchReservasi();
  }, []);

  let no = 1;

  return (
    <Layout>
      <div className="reservasi">
        <div className="reservasi-header">
          <h2>Daftar Reservasi</h2>
          <button className="add-reservasi-btn" onClick={() => navigate("/tambah-reservasi")}>
            Tambah Reservasi
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>No Meja</th>
              <th>Jumlah Tamu</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {reservasi.length > 0 ? (
              reservasi.map((data, index) => (
                <tr key={data.id_reservasi || index}>
                  <td>{no++}</td>
                  <td>{data.tanggal_reservasi}</td>
                  <td>{data.waktu_reservasi}</td>
                  <td>{data.no_meja}</td>
                  <td>{data.jumlah_tamu}</td>
                  <td>{data.status}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(data.id_reservasi)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Data reservasi tidak tersedia</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );

  function handleEdit(index) {
    const selectedReservasi = reservasi[index];
    navigate("/edit-reservasi", { state: { reservasi: selectedReservasi, index } });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus reservasi ini?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/reservasi/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete reservasi");
      const updatedReservasi = reservasi.filter((item) => item.id_reservasi !== id);
      setReservasi(updatedReservasi);
      alert("Reservasi berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting reservasi:", error);
      alert("Terjadi kesalahan saat menghapus reservasi");
    }
  }
}

export default Reservasi;
