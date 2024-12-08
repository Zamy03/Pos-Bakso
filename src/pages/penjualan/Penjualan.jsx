import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import penjualanData from "../../data/penjualan.json";

function Penjualan() {
    const [penjualan, setPenjualan] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("penjualan")) || [];
        setPenjualan([...penjualanData, ...localStorageData]);
    }, []);

    let no = 1;

    function handleDelete(index) {
        const updatePenjualan = [...penjualan];
        updatePenjualan.splice(index, 1);
        setPenjualan(updatePenjualan);
        localStorage.setItem(
          "penjualan",
          JSON.stringify(updatePenjualan.filter((item) => !penjualanData.includes(item)))
        );
      }

    return (
        <Layout>
        <div className="penjualan">
            <div className="penjualan-header">
                <h2>Penjualan</h2>
                <button
                    className="add-penjualan-btn"
                    onClick={() => navigate("/tambah-penjualan")}
                >
                    Tambah Penjualan
                </button>
            </div>
            <table>
            <thead>
                <tr>
                <th>No</th>
                <th>Kode Transaksi</th>
                <th>Nama Pembeli</th>
                <th>Tanggal</th>
                <th>Produk</th>
                <th>Total Harga</th>
                <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {penjualan.map((data, index) => (
                    <tr key={index}>
                        <td data-label="No">{no++}</td>
                        <td data-label="Kode Transaksi">{data.kode_transaksi}</td>
                        <td data-label="Nama Pembeli">{data.nama_pembeli}</td>
                        <td data-label="Tanggal">{data.tanggal}</td>
                        <td data-label="Produk">{data.produk.map((item, i) => {
                            return (
                                <p key={i}>
                                    {item.nama} ({item.jumlah})
                                </p>
                            );
                        })}</td>
                        <td data-label="Total Harga">{data.total}</td>
                        <td data-label="Aksi">
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

export default Penjualan;