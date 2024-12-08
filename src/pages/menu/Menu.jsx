import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import menuData from "../../data/menu.json";

function Menu() {
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("products")) || [];
    setMenu([...menuData, ...localStorageData]);
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
            {menu.map((data, index) => (
              <tr key={index}>
                <td data-label="No">{no++}</td>
                <td data-label="Nama Menu">{data.nama || data.name}</td>
                <td data-label="Jenis">{data.jenis || data.category}</td>
                <td data-label="Harga">{data.harga || data.price}</td>
                <td data-label="Stok">{data.stok || data.stock}</td>
                <td data-label="Aksi">
                  <button onClick={() => handleDelete(index)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );

  function handleDelete(index) {
    const updatedMenu = [...menu];
    updatedMenu.splice(index, 1);
    setMenu(updatedMenu);
    localStorage.setItem(
      "products",
      JSON.stringify(updatedMenu.filter((item) => !menuData.includes(item)))
    );
  }
}

export default Menu;
