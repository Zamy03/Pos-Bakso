import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function UpdatePelanggan() {
  const [pelanggan, setPelanggan] = useState({
    nama: "",
    alamat: "",
    no_hp: "",
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { pelanggan, id } = location.state;
      if (pelanggan && id) {
        setEditingId(id);
        setPelanggan(pelanggan);
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPelanggan({
      ...pelanggan,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pelanggan.nama || !pelanggan.alamat || !pelanggan.no_hp) {
      alert("Semua kolom harus diisi!");
      return;
    }

    try {
      if (editingId) {
        const response = await fetch(`http://localhost:3000/pelanggan/update/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify(pelanggan),
        });

        if (!response.ok) {
          throw new Error("Gagal memperbarui pelanggan");
        }

        alert("Pelanggan berhasil diperbarui!");
      } else {
        const response = await fetch("http://localhost:3000/pelanggan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify(pelanggan),
        });

        if (!response.ok) {
          throw new Error("Gagal menambahkan pelanggan");
        }

        alert("Pelanggan berhasil ditambahkan!");
      }

      setPelanggan({
        nama: "",
        alamat: "",
        no_hp: "",
      });
      navigate("/pelanggan");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
      <div className="add-pelanggan-form">
        <h2>{editingId ? "Edit Pelanggan" : "Tambah Pelanggan"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nama Pelanggan:
            <input type="text" name="nama" value={pelanggan.nama} onChange={handleChange} required />
          </label>
          <label>
            Alamat:
            <input type="text" name="alamat" value={pelanggan.alamat} onChange={handleChange} required />
          </label>
          <label>
            No. Telepon:
            <input type="text" name="no_hp" value={pelanggan.no_hp} onChange={handleChange} required />
          </label>
          <div className="button-group">
            <button type="submit" className="save-button">
              {editingId ? "Update Pelanggan" : "Simpan Pelanggan"}
            </button>
            <button type="button" className="back-button" onClick={() => navigate("/pelanggan")}>
              Kembali
            </button>
          </div>
        </form>
      </div>
  );
}

export default UpdatePelanggan;
