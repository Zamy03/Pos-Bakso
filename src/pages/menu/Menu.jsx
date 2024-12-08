import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import menuData from "../../data/menu.json";

function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("products")) || [];
    setMenu([...menuData, ...localStorageData]);
  }, []);

  let no = 1;

  return (
    <Layout>
      <div className="menu">
        <h2>Daftar Menu</h2>
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
                <td>{no++}</td>
                <td>{data.nama || data.name}</td>
                <td>{data.jenis || data.category}</td>
                <td>{data.harga || data.price}</td>
                <td>{data.stok || data.stock}</td>
                <td>
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
