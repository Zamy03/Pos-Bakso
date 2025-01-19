import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function Pegawai() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/pgw/pg");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.data); // Access `data` array from response
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  let no = 1;

  return (
    <Layout>
      <div className="users-management">
        <div className="users-header">
          <h2>Daftar Pengguna</h2>
          <button
            className="add-user-btn"
            onClick={() => navigate("/tambah-pg")}
          >
            Tambah Pengguna
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{no++}</td>
                  <td>{user.nama}</td>
                  <td>{user.no_hp}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleEdit(user.id)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Data pengguna tidak tersedia</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );

  async function handleEdit(id) {
    const selectedUser = users.find((user) => user.id === id);
    navigate("/edit-pg", { state: { user: selectedUser } });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/pgw/dpg/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Gagal menghapus pengguna");
        }
        setUsers(users.filter((user) => user.id !== id)); // Update users setelah berhasil dihapus
        alert("Pengguna berhasil dihapus.");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Terjadi kesalahan saat menghapus pengguna.");
      }
    }
  }}

export default Pegawai;
