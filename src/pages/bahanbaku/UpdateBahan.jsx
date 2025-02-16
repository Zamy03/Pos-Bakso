import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function UpdateBahan() {
  const [bahan, setBahan] = useState({
    nama_bahan: "",
    stok: "",
    satuan: "",
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { bahan, id } = location.state;
      if (bahan && id) {
        setEditingId(id);
        setBahan(bahan);
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBahan({
      ...bahan,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bahan.nama_bahan || !bahan.stok || !bahan.satuan) {
      alert("Semua kolom harus diisi!");
      return;
    }

    try {
      if (editingId) {
        const response = await fetch(`http://localhost:3000/bahan/update/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify(bahan),
        });

        if (!response.ok) {
          throw new Error("Gagal memperbarui bahan baku");
        }

        alert("Bahan baku berhasil diperbarui!");
      } else {
        const response = await fetch("http://localhost:3000/bahan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify(bahan),
        });

        if (!response.ok) {
          throw new Error("Gagal menambahkan bahan baku");
        }

        alert("Bahan baku berhasil ditambahkan!");
      }

      setBahan({
        nama_bahan: "",
        stok: "",
        satuan: "",
      });
      navigate("/bahan");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
      <div className="add-bahan-form">
        <h2>{editingId ? "Edit Bahan Baku" : "Tambah Bahan Baku"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nama Bahan:
            <input type="text" name="nama_bahan" value={bahan.nama_bahan} onChange={handleChange} required />
          </label>
          <label>
            Stok:
            <input type="number" name="stok" value={bahan.stok} onChange={handleChange} required />
          </label>
          <label>
            Satuan:
            <input type="text" name="satuan" value={bahan.satuan} onChange={handleChange} required />
          </label>
          <div className="button-group">
            <button type="submit" className="save-button">
              {editingId ? "Update Bahan" : "Simpan Bahan"}
            </button>
            <button type="button" className="back-button" onClick={() => navigate("/bahan-baku")}>Kembali</button>
          </div>
        </form>
      </div>
  );
}

export default UpdateBahan;
