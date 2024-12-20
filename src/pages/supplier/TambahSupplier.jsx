import React, { useState } from "react";

function TambahSupplier({ onAddSupplier }) {
  const [newSupplier, setNewSupplier] = useState({
    id: "",
    nama: "",
    jenis: "",
    alamat: "",
    telepon: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({
      ...newSupplier,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingSupplier = JSON.parse(localStorage.getItem("supplier")) || [];
    const updatedSupplier = [...existingSupplier, newSupplier];
    localStorage.setItem("supplier", JSON.stringify(updatedSupplier));
    alert("Data Supplier Berhasil ditambahkan!");
    onAddSupplier(newSupplier); // Memanggil fungsi untuk update tabel di komponen Supplier
    setNewSupplier({
    id: "",
    nama: "",
    jenis: "",
    alamat: "",
    telepon: "",
    });
  };

  return (
    <div className="add-supplier-form">
      <h2>Tambah Supplier</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID Supplier:
          <input
            type="text"
            name="id"
            value={newSupplier.id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nama Supllier:
          <input
            type="text"
            name="nama"
            value={newSupplier.nama}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Jenis Supply:
          <input
            type="text"
            name="jenis"
            value={newSupplier.jenis}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Alamat:
          <input
            type="text"
            name="alamat"
            value={newSupplier.alamat}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Telepon:
          <input
            type="text"
            name="telepon"
            value={newSupplier.telepon}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default TambahSupplier;
