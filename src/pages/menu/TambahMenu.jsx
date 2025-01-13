import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TambahMenu() {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    nama_menu: "",
    id_kategori: "",
    harga: "",
    tersedia: true,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        const data = await response.json();

        // Tambahkan kategori default jika tidak ada di data API
        const defaultCategories = [
          { id: 1, nama_kategori: "Makanan" },
          { id: 2, nama_kategori: "Minuman" },
        ];

        const mergedCategories = defaultCategories.concat(
          data.filter(
            (apiCategory) =>
              !defaultCategories.some(
                (defaultCategory) => defaultCategory.id === apiCategory.id
              )
          )
        );

        setCategories(mergedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);

        // Fallback ke kategori default jika API gagal
        setCategories([
          { id: 1, nama_kategori: "Makanan" },
          { id: 2, nama_kategori: "Minuman" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="add-product-form">
      <h2>Tambah Produk</h2>
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
            name="id_kategori"
            value={newProduct.id_kategori}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Pilih Kategori
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nama_kategori}
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
        <button type="submit">Simpan Produk</button>
      </form>
    </div>
  );
}

export default TambahMenu;
