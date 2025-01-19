import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";

function EditPegawai() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data pegawai yang akan diedit (diambil dari state di navigate)
  const { user } = location.state;

  const [formData, setFormData] = useState({
    nama: user.nama || "",
    no_hp: user.no_hp || "",
    email: user.email || "",
    password: "",
    role: user.role || "kasir",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmEdit = window.confirm("Apakah Anda yakin ingin menyimpan perubahan?");
    if (confirmEdit) {
      try {
        const response = await fetch(`http://localhost:3000/pgw/epg/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Gagal memperbarui data pegawai");
        }

        alert("Data pegawai berhasil diperbarui");
        navigate("/pegawai"); // Kembali ke halaman daftar pegawai
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat memperbarui data pegawai");
      }
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <h2>Edit Pegawai</h2>
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

          <label>Password (Opsional)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Kosongkan jika tidak ingin mengubah password"
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

export default EditPegawai;
