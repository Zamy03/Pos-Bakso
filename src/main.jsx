import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Menu from "./pages/menu/Menu.jsx";
import Pelanggan from "./pages/pelanggan/Pelanggan.jsx";
import TambahPelanggan from "./pages/pelanggan/TambahPelanggan.jsx";
import UpdatePelanggan from "./pages/pelanggan/UpdatePelanggan.jsx";
import Penjualan from "./pages/penjualan/Penjualan.jsx";
import TambahPenjualan from "./pages/penjualan/TambahPenjualan.jsx";
import TambahMenu from "./pages/menu/TambahMenu.jsx";
import Pegawai from "./pages/pegawai/Pegawai.jsx";
import { AuthProvider } from "./components/auth.jsx";
import ProtectedRoute from "./components/proute.jsx";
import TambahPegawai from "./pages/pegawai/TambahPg.jsx";
import EditPegawai from "./pages/pegawai/EditPg.jsx";
import EditMenu from "./pages/menu/EditMenu.jsx";
import Register from "./pages/register/Regist.jsx";
import Supplier from "./pages/supplier/Supplier.jsx";
import TambahSupplier from "./pages/supplier/TambahSupplier.jsx";
import Cashier from "./pages/cashier/Cashier.jsx";
import Reservasi from "./pages/reservasi/Reservasi.jsx";
import TambahReservasi from "./pages/reservasi/TambahReservasi.jsx";
import EditReservasi from "./pages/reservasi/EditReservasi.jsx";
import BahanBaku from "./pages/bahanbaku/Bahanbaku.jsx";
import TambahBahan from "./pages/bahanbaku/TambahBahan.jsx";
import UpdateBahan from "./pages/bahanbaku/UpdateBahan.jsx";
import PembelianBahanBaku from "./pages/pembelianbahanbaku/PembelianBahanBaku.jsx";
import TambahPembelianBahanBaku from "./pages/pembelianbahanbaku/TambahPembelianBahanBaku.jsx";
// import EditPembelianBahanBaku from "./pages/pembelianbahanbaku/EditPembelianBahanBaku.jsx";
import Laporan from "./pages/dashboard/dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/regist" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/tambah-pelanggan" element={<TambahPelanggan />} />
          <Route path="/update-pelanggan" element={<UpdatePelanggan />} />
          <Route path="/penjualan" element={<Penjualan />} />
          <Route path="/tambah-penjualan" element={<TambahPenjualan />} />
          <Route path="/tambah-menu" element={<TambahMenu />} />
          <Route path="/edit-menu" element={<EditMenu />} />
          <Route path="/pegawai" element={<Pegawai />} />
          <Route path="/tambah-pg" element={<TambahPegawai />} />
          <Route path="/edit-pg" element={<EditPegawai />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/tambah-supplier" element={<TambahSupplier />} />
          <Route path="/cashier" element={<Cashier />} />
          <Route path="/reservasi" element={<Reservasi />} />
          <Route path="/tambah-reservasi" element={<TambahReservasi />} />
          <Route path="/edit-reservasi" element={<EditReservasi />} />
          <Route path="/bahan-baku" element={<BahanBaku />} />
          <Route path="/tambah-bahan" element={<TambahBahan />} />
          <Route path="/update-bahan" element={<UpdateBahan />} />
          <Route path="/pembelian-bahan-baku" element={<PembelianBahanBaku />} />
          <Route path="/tambah-pembelian-bahan-baku" element={<TambahPembelianBahanBaku />} />
          {/* <Route path="/edit-pembelian-bahan-baku" element={<EditPembelianBahanBaku />} /> */}
          <Route path="/dashboard" element={<Laporan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
</StrictMode>
);
