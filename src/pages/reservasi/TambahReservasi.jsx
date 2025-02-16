import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TambahReservasi() {
  const navigate = useNavigate();
  const [pelanggan, setPelanggan] = useState([]);
  const [reservasi, setReservasi] = useState({
    tanggal_reservasi: "",
    waktu_reservasi: "",
    no_meja: "",
    jumlah_tamu: "",
    status: "Dipesan",
    request: "",
    id_pelanggan: "",
  });

  // Fetch data pelanggan untuk select option
  useEffect(() => {
    async function fetchPelanggan() {
      try {
        const response = await fetch("http://localhost:3000/pelanggan/all");
        if (!response.ok) throw new Error("Gagal mengambil data pelanggan");
        const data = await response.json();
        setPelanggan(data);
      } catch (error) {
        console.error("Error fetching pelanggan:", error);
      }
    }
    fetchPelanggan();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservasi({ ...reservasi, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmSubmit = window.confirm("Apakah Anda yakin ingin menambahkan reservasi ini?");
    if (!confirmSubmit) return;

    try {
      const response = await fetch("http://localhost:3000/api/reservasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservasi),
      });

      if (!response.ok) throw new Error("Gagal menambahkan reservasi");

      const createdReservasi = await response.json();
      alert("Reservasi berhasil ditambahkan!");
      navigate("/reservasi", { state: { createdReservasi } });
    } catch (error) {
      console.error("Error adding reservasi:", error);
      alert("Terjadi kesalahan saat menambahkan reservasi");
    }
  };

  return (
    <div className="add-reservasi-form">
      <h2>Tambah Reservasi</h2>
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
          <select
            name="id_pelanggan"
            value={reservasi.id_pelanggan}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Pilih Pelanggan</option>
            {pelanggan.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Simpan Reservasi</button>
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/reservasi")}
        >
          Kembali
        </button>
      </form>
    </div>
  );
}

export default TambahReservasi;
