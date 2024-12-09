import React, { useState } from "react";

function TambahMenu({ onAddProduct, onEditProduct, editData }) {
  const [newProduct, setNewProduct] = useState(
    editData || {
      name: "",
      category: "",
      price: "",
      stock: "",
    }
  );

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

    if (editData) {
      // Mode Edit
      const updatedProducts = existingProducts.map((product) =>
        product.name === editData.name ? newProduct : product
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      if (onEditProduct) onEditProduct(newProduct);
      alert("Produk berhasil diperbarui!");
    } else {
      // Mode Tambah
      const updatedProducts = [...existingProducts, newProduct];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      if (onAddProduct) onAddProduct(newProduct);
      alert("Produk berhasil ditambahkan!");
    }

    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  return (
    <div className="add-product-form">
      <h2>{editData ? "Edit Produk" : "Tambah Produk"}</h2>
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
        <button type="submit">{editData ? "Perbarui" : "Simpan Produk"}</button>
      </form>
    </div>
  );
}


export default TambahMenu;
