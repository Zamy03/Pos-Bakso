import React, { useState, useEffect } from "react";

function TambahMenu({ onAddProduct, onEditProduct, editData }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryId: 1, // default ke Makanan (ID 1)
    price: "",
    stock: true, // default stok tersedia
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Jika ada data edit, set ke form
  useEffect(() => {
    if (editData) {
      setNewProduct({
        name: editData.nama_menu || "",
        categoryId: editData.id_kategori || 1, // ID kategori untuk produk yang diedit
        price: editData.harga || "",
        stock: editData.stok || true, // stok tersedia atau tidak
      });
    }
    // Ambil data kategori dari API atau sumber lain
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = editData
        ? await fetch(`http://localhost:3000/api/menus/${editData.id_menu}`, {
            method: "PUT", // Untuk memperbarui menu
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nama_menu: newProduct.name,
              id_kategori: newProduct.categoryId,
              harga: newProduct.price,
              stok: newProduct.stock,
            }),
          })
        : await fetch("http://localhost:3000/api/menus", {
            method: "POST", // Untuk menambah menu baru
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nama_menu: newProduct.name,
              id_kategori: newProduct.categoryId,
              harga: newProduct.price,
              stok: newProduct.stock,
            }),
          });

      if (!response.ok) {
        throw new Error("Gagal menambah/ memperbarui menu");
      }

      const result = await response.json(); // Menyimpan hasil menu yang ditambahkan/ diperbarui

      if (editData) {
        if (onEditProduct) onEditProduct(result); // Update data di parent
        alert("Produk berhasil diperbarui!");
      } else {
        if (onAddProduct) onAddProduct(result); // Menambahkan produk baru ke parent
        alert("Produk berhasil ditambahkan!");
      }

      setNewProduct({
        name: "",
        categoryId: 1,
        price: "",
        stock: true,
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menyimpan data menu.");
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="add-product-form">
      <h2>{editData ? "Edit Produk" : "Tambah Produk"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nama Menu:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategori:</label>
          <select
            name="categoryId"
            id="category"
            value={newProduct.categoryId}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nama_kategori}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Harga:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stok Tersedia:</label>
          <input
            type="checkbox"
            name="stock"
            id="stock"
            checked={newProduct.stock}
            onChange={handleChange}
          />
        </div>

        <button type="submit">{editData ? "Perbarui" : "Simpan Produk"}</button>
      </form>
    </div>
  );
}

export default TambahMenu;
