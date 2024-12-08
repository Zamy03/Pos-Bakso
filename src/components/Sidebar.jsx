import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Sidebar() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation based on the selected option
  const handleNavigation = (destination) => {
    navigate(destination); // Redirect to the specified destination
  };

  return (
    <div className="layout-dashboard-sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li onClick={() => handleNavigation('/penjualan')}>Penjualan</li>
        <li onClick={() => handleNavigation('/menu')}>Produk</li>
        <li onClick={() => handleNavigation('/pegawai')}>Pegawai</li>
      </ul>
    </div>
  );
}

export default Sidebar;