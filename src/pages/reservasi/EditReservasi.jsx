import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function EditReservasi() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [reservasi, setReservasi] = useState({
    tanggal_reservasi: "",
    waktu_reservasi: "",
    no_meja: "",
    jumlah_tamu: "",
    status: "Dipesan",
    request: "",
    nama_pelanggan: "", // Nama pelanggan yang tidak bisa diubah
  });

  useEffect(() => {
    if (location.state) {
      const data = location.state.reservasi;
      setReservasi({
        tanggal_reservasi: data.tanggal_reservasi,
        waktu_reservasi: data.waktu_reservasi,
        no_meja: data.no_meja,
        jumlah_tamu: data.jumlah_tamu,
        status: data.status,
        request: data.request,
        nama_pelanggan: data.pelanggan.nama, // Ambil nama pelanggan
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservasi({ ...reservasi, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmSubmit = window.confirm("Apakah Anda yakin ingin mengupdate reservasi ini?");
    if (!confirmSubmit) return;

    const updatedReservasi = { ...reservasi };
    delete updatedReservasi.nama_pelanggan; // Tidak menyertakan nama pelanggan ke API

    try {
      const response = await fetch(`http://localhost:3000/api/reservasi/${location.state.reservasi.id_reservasi}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedReservasi),
      });

      if (!response.ok) throw new Error("Gagal mengupdate reservasi");

      alert("Reservasi berhasil diupdate!");
      navigate("/reservasi");
    } catch (error) {
      console.error("Error updating reservasi:", error);
      alert("Terjadi kesalahan saat mengupdate reservasi");
    }
  };

  return (
    <div className="edit-reservasi-form">
      <h2>Edit Reservasi</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tanggal Reservasi:
          <input
            type="date"
            name="tanggal_reservasi"
            value={reservasi.tanggal_reservasi}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Waktu Reservasi:
          <input
            type="time"
            name="waktu_reservasi"
            value={reservasi.waktu_reservasi}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nomor Meja:
          <input
            type="number"
            name="no_meja"
            value={reservasi.no_meja}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Jumlah Tamu:
          <input
            type="number"
            name="jumlah_tamu"
            value={reservasi.jumlah_tamu}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select name="status" value={reservasi.status} onChange={handleChange} required>
            <option value="Dipesan">Dipesan</option>
            <option value="Dikonfirmasi">Dikonfirmasi</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </label>
        <label>
          Permintaan Khusus:
          <textarea
            name="request"
            value={reservasi.request}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </label>
        <label>
          Nama Pelanggan:
          <input
            name="nama_pelanggan"
            value={reservasi.nama_pelanggan}
            readOnly
            required
          />
        </label>
        <button type="submit">Update Reservasi</button>
      </form>
    </div>
  );
}

export default EditReservasi;
