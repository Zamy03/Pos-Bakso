import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, index } = location.state;

  const [updatedProduct, setUpdatedProduct] = useState({
    nama_menu: product.nama_menu || "",
    kategori: product.kategori?.nama_kategori || "", // Handle kategori field properly
    harga: product.harga || "",
    tersedia: product.tersedia || true, // Assuming 'tersedia' is a boolean
  });

  useEffect(() => {
    // If you want to pre-fill other dynamic data, useEffect is a good place for it.
    setUpdatedProduct({
      nama_menu: product.nama_menu || "",
      kategori: product.kategori?.nama_kategori || "",
      harga: product.harga || "",
      tersedia: product.tersedia || true,
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:3000/api/menus/${product.id_menu}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
  
      if (!response.ok) {
        throw new Error("Gagal memperbarui data menu");
      }
  
      const updatedMenu = await response.json(); // Mendapatkan data yang diperbarui dari server
      alert("Produk berhasil diperbarui!");
      navigate("/menu", { state: { updatedMenu, index } }); // Mengirimkan data yang diperbarui kembali ke halaman Menu
    } catch (error) {
      console.error("Error updating menu:", error);
      alert("Terjadi kesalahan saat memperbarui produk");
    }
  };
  

  return (
    <div className="edit-product-form">
      <h2>Edit Produk</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Produk:
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
          <input
            type="text"
            name="kategori"
            value={updatedProduct.kategori}
            onChange={handleChange}
            required
          />
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
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, tersedia: e.target.checked })}
          />
          Tersedia
        </label>
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}

export default EditMenu;
