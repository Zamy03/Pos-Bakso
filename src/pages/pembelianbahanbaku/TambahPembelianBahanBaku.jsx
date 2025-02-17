import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TambahPembelian() {
  const navigate = useNavigate();
  const [bahan, setBahan] = useState([]);
  const [pembelian, setPembelian] = useState({
    jumlah: "",
    satuan: "",
    harga_total: "",
    nama_supplier: "",
    tanggal_pembelian: "",
    id_bahan: "",
  });

  // Fetch data bahan baku untuk select option
  useEffect(() => {
    async function fetchBahan() {
      try {
        const response = await fetch("http://localhost:3000/bahan/all");
        if (!response.ok) throw new Error("Gagal mengambil data bahan baku");
        const data = await response.json();
        setBahan(data);
      } catch (error) {
        console.error("Error fetching bahan:", error);
      }
    }
    fetchBahan();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPembelian({ ...pembelian, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmSubmit = window.confirm("Apakah Anda yakin ingin menambahkan pembelian ini?");
    if (!confirmSubmit) return;

    try {
      const response = await fetch("http://localhost:3000/pembelian/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pembelian),
      });

      if (!response.ok) throw new Error("Gagal menambahkan pembelian");

      const createdPembelian = await response.json();
      alert("Pembelian berhasil ditambahkan!");
      navigate("/pembelian-bahan-baku", { state: { createdPembelian } });
    } catch (error) {
      console.error("Error adding pembelian:", error);
      alert("Terjadi kesalahan saat menambahkan pembelian");
    }
  };

  return (
    <div className="add-pembelian-form">
      <h2>Tambah Pembelian Bahan Baku</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Jumlah:
          <input
            type="number"
            name="jumlah"
            value={pembelian.jumlah}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Satuan:
          <input
            type="text"
            name="satuan"
            value={pembelian.satuan}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Harga Total:
          <input
            type="number"
            name="harga_total"
            value={pembelian.harga_total}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nama Supplier:
          <input
            type="text"
            name="nama_supplier"
            value={pembelian.nama_supplier}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Tanggal Pembelian:
          <input
            type="date"
            name="tanggal_pembelian"
            value={pembelian.tanggal_pembelian}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Pilih Bahan Baku:
          <select
            name="id_bahan"
            value={pembelian.id_bahan}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Pilih Bahan Baku</option>
            {bahan.map((b) => (
              <option key={b.id_bahan} value={b.id_bahan}>
                {b.nama_bahan}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Simpan Pembelian</button>
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/pembelian-bahan-baku")}
        >
          Kembali
        </button>
      </form>
    </div>
  );
}

export default TambahPembelian;
