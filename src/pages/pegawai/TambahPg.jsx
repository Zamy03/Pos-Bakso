import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function TambahPegawai() {
  const [formData, setFormData] = useState({
    nama: "",
    no_hp: "",
    email: "",
    password: "",
    role: "kasir", // Default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmAdd = window.confirm("Apakah Anda yakin ingin menambahkan pegawai?");
    if (confirmAdd) {
      try {
        const response = await fetch("http://localhost:3000/pgw/apg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Gagal menambahkan pegawai");
        }

        alert("Pegawai berhasil ditambahkan");
        navigate("/pegawai"); // Kembali ke halaman daftar pegawai
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menambahkan pegawai");
      }
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <h2>Tambah Pegawai</h2>
        <form onSubmit={handleSubmit}>
          <label>Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />

          <label>No HP</label>
          <input
            type="text"
            name="no_hp"
            value={formData.no_hp}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="kasir">Kasir</option>
            <option value="manajer">Manajer</option>
          </select>

          <button type="submit">Simpan</button>
          <button type="button" onClick={() => navigate("/pegawai")}>
            Batal
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default TambahPegawai;
