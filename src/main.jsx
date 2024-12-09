import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Menu from "./pages/menu/Menu.jsx";
import Pelanggan from "./pages/pelanggan/Pelanggan.jsx";
import TambahPelanggan from "./pages/pelanggan/TambahPelanggan.jsx";
import Penjualan from "./pages/penjualan/Penjualan.jsx";
import TambahPenjualan from "./pages/penjualan/TambahPenjualan.jsx";
import TambahMenu from "./pages/menu/TambahMenu.jsx";
import Pegawai from "./pages/pegawai/Pegawai.jsx";
import { AuthProvider } from "./components/auth.jsx";
import ProtectedRoute from "./components/proute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/tambah-pelanggan" element={<TambahPelanggan />} />
          <Route path="/penjualan" element={<Penjualan />} />
          <Route path="/tambah-penjualan" element={<TambahPenjualan />} />
          <Route path="/tambah-menu" element={<TambahMenu />} />
          <Route path="/pegawai" element={<Pegawai />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
</StrictMode>
);
