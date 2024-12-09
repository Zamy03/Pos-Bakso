import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, index } = location.state;

  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name || "",
    category: product.category || "",
    price: product.price || "",
    stock: product.stock || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    existingProducts[index] = updatedProduct; // Update produk berdasarkan indeks
    localStorage.setItem("products", JSON.stringify(existingProducts));
    alert("Produk berhasil diperbarui!");
    navigate("/menu", { state: { updatedProduct, index } }); // Kirim data kembali ke Menu
  };

  return (
    <div className="edit-product-form">
      <h2>Edit Produk</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Produk:
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Kategori:
          <input
            type="text"
            name="category"
            value={updatedProduct.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Harga:
          <input
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stok:
          <input
            type="number"
            name="stock"
            value={updatedProduct.stock}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}

export default EditMenu;