import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Sidebar() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation based on the selected option
  const handleNavigation = (destination) => {
    if (destination === '/') {
      // Show confirmation dialog for logout
      const confirmLogout = window.confirm("Apakah Kamu Yakin Ingin Logout?");
      if (confirmLogout) {
        // If confirmed, navigate to the logout route
        alert("Logout Berhasil!")
        navigate(destination);
      }
    } else {
      navigate(destination); // Redirect to the specified destination
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to track if the sidebar is open

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Button to open sidebar */}
      {!isSidebarOpen && (
        <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      <div className={`layout-dashboard-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => handleNavigation('/penjualan')}>Penjualan</li>
          <li onClick={() => handleNavigation('/pelanggan')}>Pelanggan</li>
          <li onClick={() => handleNavigation('/menu')}>Produk</li>
          <li onClick={() => handleNavigation('/pegawai')}>Pegawai</li>
          <li onClick={() => handleNavigation('/')}>Logout</li>
        </ul>
        {/* Button to close sidebar */}
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