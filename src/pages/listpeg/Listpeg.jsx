import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function Listpeg() {
  const [menu, setMenu] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    nohp: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("products")) || [];
    setMenu(localStorageData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrEdit = () => {
    if (isEditing) {
      const updatedMenu = [...menu];
      updatedMenu[currentIndex] = formData;
      setMenu(updatedMenu);
      localStorage.setItem("products", JSON.stringify(updatedMenu));
      setIsEditing(false);
    } else {
      setMenu([...menu, formData]);
      localStorage.setItem("products", JSON.stringify([...menu, formData]));
    }
    setFormData({ nama: '', email: '', nohp: '', password: '' });
  };

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setFormData({
      nama: menu[index].nama || '',
      email: menu[index].email || '',
      nohp: menu[index].nohp || '',
      password: menu[index].password || '',
    });
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    const updatedMenu = [...menu];
    updatedMenu.splice(index, 1);
    setMenu(updatedMenu);
    localStorage.setItem("products", JSON.stringify(updatedMenu));
  };

  return (
    <Layout>
      <div className="menu">
        <div className="menu-header">
          <h2>Daftar Pegawai</h2>
        </div>

        <div className="menu-form">
          <input
            type="text"
            name="nama"
            placeholder="Nama Pegawai"
            value={formData.nama}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="integer" // Changed from 'nohp' to 'text'
            name="nohp"
            placeholder="No HP"
            value={formData.nohp}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button onClick={handleAddOrEdit}>
            {isEditing ? "Update Pegawai" : "Add Pegawai"}
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pegawai</th>
              <th>Email</th>
              <th>No HP</th>
              <th>Password</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((data, index) => (
              <tr key={index}>
                <td data-label="No">{index + 1}</td>
                <td data-label="Nama Pegawai">{data.nama || data.nama}</td>
                <td data-label="Email">{data.email || data.email}</td>
                <td data-label="No HP">{data.nohp || data.nohp}</td>
                <td data-label="Password">{data.password || data.password}</td>
                <td data-label="Aksi">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Listpeg;