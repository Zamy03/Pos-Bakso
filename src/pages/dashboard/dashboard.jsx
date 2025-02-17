import React, { useEffect, useState} from "react";
import axios from "axios";
import Layout from "../../components/Layout";

function Laporan() {
    const [transaksi, setTransaksi] = useState([]);
    const [reservasi, setReservasi] = useState([]);
    const [pembelian, setPembelian] = useState([]);
    const [menuFavorite, setMenuFavorite] = useState([]);
    const [totalPelanggan, setTotalPelanggan] = useState(0);
    const [bahanTerbeli, setBahanTerbeli] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const transaksiRes = await axios.get("http://localhost:3000/transaksi/all");
        const reservasiRes = await axios.get("http://localhost:3000/api/reservasi");
        const pembelianRes = await axios.get("http://localhost:3000/pembelian/all");
  
        setTransaksi(transaksiRes.data);
        setReservasi(reservasiRes.data);
        setPembelian(pembelianRes.data);
  
        processMenuFavorite(transaksiRes.data);
        setTotalPelanggan(reservasiRes.data.length);
        processBahanTerbeli(pembelianRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const processMenuFavorite = (data) => {
      const menuCount = {};
      data.forEach((item) => {
        if (menuCount[item.nama_menu]) {
          menuCount[item.nama_menu] += item.jumlah;
        } else {
          menuCount[item.nama_menu] = item.jumlah;
        }
      });
      const sortedMenu = Object.entries(menuCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
      setMenuFavorite(sortedMenu);
    };
  
    const processBahanTerbeli = (data) => {
      const bahanCount = {};
      data.forEach((item) => {
        if (bahanCount[item.bahan_baku.nama_bahan]) {
          bahanCount[item.bahan_baku.nama_bahan] += item.jumlah;
        } else {
          bahanCount[item.bahan_baku.nama_bahan] = item.jumlah;
        }
      });
      const sortedBahan = Object.entries(bahanCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
      setBahanTerbeli(sortedBahan);
    };
  
    return (
        <Layout>
        <div className="laporan-container">
        <h1>Laporan Transaksi</h1>
        <div className="laporan-card-container">
          <div className="laporan-card">
            <h2>Menu Favorit</h2>
            {menuFavorite.length > 0 ? (
              <ol>
                {menuFavorite.map(([nama, jumlah], index) => (
                  <li key={index}>{`Peringkat ${index + 1}: ${nama} - ${jumlah} terjual`}</li>
                ))}
              </ol>
            ) : (
              <p>Belum ada data</p>
            )}
          </div>
          <div className="laporan-card">
            <h2>Total Pelanggan Dilayani</h2>
            <p>{totalPelanggan}</p>
          </div>
          <div className="laporan-card">
            <h2>Bahan Baku Paling Sering Dibeli</h2>
            {bahanTerbeli.length > 0 ? (
              <ol>
                {bahanTerbeli.map(([nama, jumlah], index) => (
                  <li key={index}>{`Peringkat ${index + 1}: ${nama} - ${jumlah} dibeli`}</li>
                ))}
              </ol>
            ) : (
              <p>Belum ada data</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
    );
  }
  
  export default Laporan;