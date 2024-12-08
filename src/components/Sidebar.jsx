import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Sidebar() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation based on the selected option
  const handleNavigation = (destination) => {
    navigate(destination); // Redirect to the specified destination
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk melacak apakah sidebar terbuka

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
        <li onClick={() => handleNavigation('/penjualan')}>Penjualan</li>
        <li onClick={() => handleNavigation('/menu')}>Produk</li>
        <li onClick={() => handleNavigation('/pegawai')}>Pegawai</li>
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