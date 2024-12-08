import React, { useState } from "react";

function TambahMenu({ onAddProduct }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    alert("Produk berhasil ditambahkan!");
    onAddProduct(newProduct); // Memanggil fungsi untuk update tabel di komponen Menu
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  return (
    <div className="add-product-form">
      <h2>Tambah Produk</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Produk:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Kategori:
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Harga:
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stok:
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Simpan Produk</button>
      </form>
    </div>
  );
}

export default TambahMenu;
