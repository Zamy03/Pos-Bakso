import React, { useState, useEffect } from "react";
import menuData from "../../data/menu.json";

function TambahPenjualan({ onAddPenjualan }) {
    const [newPenjualan, setNewPenjualan] = useState({
        kode_transaksi: "",
        nama_pembeli: "",
        tanggal: "",
        produk: [],
        total: 0,
    });

    const [selectedProduct, setSelectedProduct] = useState({
        nama: "",
        jumlah: 0,
    });

    // Fungsi untuk menghasilkan kode transaksi
    const generateKodeTransaksi = () => {
        const existingPenjualan = JSON.parse(localStorage.getItem("penjualan")) || [];
        const nextNumber = existingPenjualan.length + 1; // Nomor urut berdasarkan jumlah data
        const kodeTransaksi = `trx${String(nextNumber).padStart(3, "0")}`; // Format trx000
        return kodeTransaksi;
    };

    // Panggil saat komponen dirender untuk inisialisasi kode transaksi
    useEffect(() => {
        setNewPenjualan((prevState) => ({
            ...prevState,
            kode_transaksi: generateKodeTransaksi(),
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPenjualan({
            ...newPenjualan,
            [name]: value,
        });
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct({
            ...selectedProduct,
            [name]: value,
        });
    };

    const handleAddProduct = () => {
        // Cari data produk dari menuData
        const productData = menuData.find((item) => item.nama === selectedProduct.nama);
        if (!productData) {
            alert("Produk tidak ditemukan!");
            return;
        }

        const jumlah = parseInt(selectedProduct.jumlah, 10);
        const harga = productData.harga;
        const subtotal = jumlah * harga;

        // Tambahkan produk dan perbarui total
        setNewPenjualan({
            ...newPenjualan,
            produk: [
                ...newPenjualan.produk,
                { ...selectedProduct, harga, subtotal },
            ],
            total: newPenjualan.total + subtotal,
        });

        // Reset produk yang dipilih
        setSelectedProduct({
            nama: "",
            jumlah: 0,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingPenjualan = JSON.parse(localStorage.getItem("penjualan")) || [];
        const updatedPenjualan = [...existingPenjualan, newPenjualan];
        localStorage.setItem("penjualan", JSON.stringify(updatedPenjualan));
        alert("Penjualan berhasil ditambahkan!");
        onAddPenjualan(newPenjualan);
        setNewPenjualan({
            kode_transaksi: generateKodeTransaksi(), // Set kode transaksi baru untuk penjualan berikutnya
            nama_pembeli: "",
            tanggal: "",
            produk: [],
            total: 0,
        });
    };

    return (
        <div className="add-penjualan-form">
            <h2>Tambah Penjualan</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Kode Transaksi:
                    <input
                        type="text"
                        name="kode_transaksi"
                        value={newPenjualan.kode_transaksi}
                        readOnly
                    />
                </label>
                <label>
                    Nama Pembeli:
                    <input
                        type="text"
                        name="nama_pembeli"
                        value={newPenjualan.nama_pembeli}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Tanggal:
                    <input
                        type="date"
                        name="tanggal"
                        value={newPenjualan.tanggal}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="produk-section">
                    <select
                        name="nama"
                        value={selectedProduct.nama}
                        onChange={handleProductChange}
                        required
                    >
                        <option value="">Pilih Produk</option>
                        {menuData.map((data, index) => (
                            <option key={index} value={data.nama}>
                                {data.nama}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="jumlah"
                        value={selectedProduct.jumlah}
                        onChange={handleProductChange}
                        required
                    />
                    <button type="button" onClick={handleAddProduct}>
                        Tambah
                    </button>
                </label>
                <label>
                    Total Harga: {newPenjualan.total}
                </label>
                <button type="submit">Tambah Penjualan</button>
            </form>
        </div>
    );
}

export default TambahPenjualan;
