import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function Menu() {
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from server API
    async function fetchMenu() {
      try {
        const response = await fetch("http://localhost:3000/api/menus");
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        const data = await response.json();
        setMenu(data); // Save the data to state
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }

    fetchMenu();
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
        <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Menu</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menu.length > 0 ? (
              menu.map((data, index) => {
                const nama = data.nama_menu || "Tidak Diketahui";
                const kategori = data.kategori || "Tidak Diketahui"; // Extract category name
                const harga = data.harga || "0";
                const stok = data.tersedia ? "Tersedia" : "Tidak Tersedia"; // Assuming 'tersedia' indicates stock status

                return (
                  <tr key={data.id_menu || index}>
                    <td data-label="No">{no++}</td>
                    <td data-label="Nama Menu">{nama}</td>
                    <td data-label="Kategori">{kategori}</td> {/* Display category name */}
                    <td data-label="Harga">{harga}</td>
                    <td data-label="Stok">{stok}</td> {/* Display stock availability */}
                    <td data-label="Aksi">
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(data.id_menu)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">Data menu tidak tersedia</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </Layout>
  );

  function handleEdit(index) {
    const selectedProduct = menu[index];
    navigate("/edit-menu", { state: { product: selectedProduct, index } });
  }

  async function handleDelete(id) {
    // Konfirmasi penghapusan
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus menu ini?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/menus/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete menu");
      }
      // Update state after deletion
      const updatedMenu = menu.filter((item) => item.id_menu !== id);
      setMenu(updatedMenu);
      alert("Menu berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting menu:", error);
      alert("Terjadi kesalahan saat menghapus menu");
    }
  }
}

export default Menu;
