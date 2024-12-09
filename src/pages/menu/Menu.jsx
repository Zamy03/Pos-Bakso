import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function Menu() {
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("products")) || [];
    // Pastikan hanya menggunakan data dari localStorage
    setMenu(localStorageData);
  }, []);

  let no = 1;

  return (
    <Layout>
      <div className="menu">
        <div className="menu-header">
          <h2>Daftar Menu</h2>
          <button
            className="add-menu-btn"
            onClick={() => navigate("/tambah-menu")}
          >
            Tambah Menu
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Menu</th>
              <th>Jenis</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((data, index) => {
              // Pastikan data tidak null atau undefined
              if (!data) {
                return (
                  <tr key={index}>
                    <td colSpan="6">Data tidak tersedia</td>
                  </tr>
                );
              }

              // Pastikan data memiliki properti yang diharapkan
              const nama = data.nama || data.name || "Tidak Diketahui";
              const jenis = data.jenis || data.category || "Tidak Diketahui";
              const harga = data.harga || data.price || "0";
              const stok = data.stok || data.stock || "0";

              return (
                <tr key={index}>
                  <td data-label="No">{no++}</td>
                  <td data-label="Nama Menu">{nama}</td>
                  <td data-label="Jenis">{jenis}</td>
                  <td data-label="Harga">{harga}</td>
                  <td data-label="Stok">{stok}</td>
                  <td data-label="Aksi">
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Hapus</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );

  function handleEdit(index) {
    const selectedProduct = menu[index];
    navigate("/edit-menu", { state: { product: selectedProduct, index } });
  }

  function handleDelete(index) {
    const updatedMenu = [...menu];
    updatedMenu.splice(index, 1);
    setMenu(updatedMenu);
    localStorage.setItem("products", JSON.stringify(updatedMenu));
  }
}

export default Menu;