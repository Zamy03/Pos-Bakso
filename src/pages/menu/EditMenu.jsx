import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, index } = location.state;

  const [updatedProduct, setUpdatedProduct] = useState({
    nama_menu: product.nama_menu || "",
    kategori: product.kategori || "",
    harga: product.harga || "",
    tersedia: product.tersedia || true,
  });

  const categories = ["Makanan", "Minuman", "Snack", "Dessert", "Lainnya"];

  useEffect(() => {
    setUpdatedProduct({
      nama_menu: product.nama_menu || "",
      kategori: product.kategori || "",
      harga: product.harga || "",
      tersedia: product.tersedia || true,
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Alert konfirmasi sebelum submit
    const confirmSubmit = window.confirm("Apakah Anda yakin ingin menyimpan perubahan menu ini?");
    if (!confirmSubmit) return;

    try {
      const response = await fetch(`http://localhost:3000/api/menus/${product.id_menu}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui data menu");
      }

      const updatedMenu = await response.json();
      alert("Menu berhasil diperbarui!");
      navigate("/menu", { state: { updatedMenu, index } });
    } catch (error) {
      console.error("Error updating menu:", error);
      alert("Terjadi kesalahan saat memperbarui menu");
    }
  };

  return (
    <div className="edit-product-form">
      <h2>Edit Menu</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Menu:
          <input
            type="text"
            name="nama_menu"
            value={updatedProduct.nama_menu}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Kategori:
          <select
            name="kategori"
            value={updatedProduct.kategori}
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
            value={updatedProduct.harga}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stok:
          <input
            type="checkbox"
            name="tersedia"
            checked={updatedProduct.tersedia}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, tersedia: e.target.checked })
            }
          />
          Tersedia
        </label>
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}

export default EditMenu;
