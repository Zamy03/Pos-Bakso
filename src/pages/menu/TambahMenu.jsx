import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TambahMenu() {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    nama_menu: "",
    kategori: "",
    harga: "",
    tersedia: true,
  });

  const categories = ["Makanan", "Minuman", "Snack", "Dessert", "Lainnya"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Alert konfirmasi sebelum submit
    const confirmSubmit = window.confirm("Apakah Anda yakin ingin menambahkan menu ini?");
    if (!confirmSubmit) return;

    try {
      const response = await fetch("http://localhost:3000/api/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan menu");
      }

      const createdMenu = await response.json();
      alert("Menu berhasil ditambahkan!");
      navigate("/menu", { state: { createdMenu } });
    } catch (error) {
      console.error("Error adding menu:", error);
      alert("Terjadi kesalahan saat menambahkan menu");
    }
  };

  return (
    <div className="add-product-form">
      <h2>Tambah Menu</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Menu:
          <input
            type="text"
            name="nama_menu"
            value={newProduct.nama_menu}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Kategori:
          <select
            name="kategori"
            value={newProduct.kategori}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Pilih Kategori
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Harga:
          <input
            type="number"
            name="harga"
            value={newProduct.harga}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stok:
          <input
            type="checkbox"
            name="tersedia"
            checked={newProduct.tersedia}
            onChange={(e) =>
              setNewProduct({ ...newProduct, tersedia: e.target.checked })
            }
          />
          Tersedia
        </label>
        <button type="submit">Simpan Menu</button>
      </form>
    </div>
  );
}

export default TambahMenu;
