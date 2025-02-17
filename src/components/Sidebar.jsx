import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate(); 

  // Ambil state sidebar dari localStorage (default true jika tidak ada data)
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    localStorage.getItem("sidebarOpen") === "true"
  );

  // Simpan state sidebar ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isSidebarOpen);
  }, [isSidebarOpen]);

  // Function untuk menavigasi halaman
  const handleNavigation = (destination) => {
    if (destination === '/') {
      const confirmLogout = window.confirm("Apakah Kamu Yakin Ingin Logout?");
      if (confirmLogout) {
        alert("Logout Berhasil!");
        navigate(destination);
      }
    } else {
      navigate(destination);
    }
  };

  // Function untuk toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Tombol untuk membuka sidebar */}
      {!isSidebarOpen && (
        <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      <div className={`layout-dashboard-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => handleNavigation('/dashboard')}>Dashboard</li>
          <li onClick={() => handleNavigation('/penjualan')}>Penjualan</li>
          <li onClick={() => handleNavigation('/pelanggan')}>Pelanggan</li>
          <li onClick={() => handleNavigation('/menu')}>Produk</li>
          <li onClick={() => handleNavigation('/pegawai')}>Pegawai</li>
          <li onClick={() => handleNavigation('/cashier')}>Kasir</li>
          <li onClick={() => handleNavigation('/reservasi')}>Reservasi</li>
          <li onClick={() => handleNavigation('/bahan-baku')}>Bahan Baku</li>
          <li onClick={() => handleNavigation('/pembelian-bahan-baku')}>Pembelian Bahan Baku</li>
          <li onClick={() => handleNavigation('/')}>Logout</li>
        </ul>

        {/* Tombol untuk menutup sidebar */}
        {isSidebarOpen && (
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            ✕
          </button>
        )}
      </div>
    </>
  );
}

export default Sidebar;
