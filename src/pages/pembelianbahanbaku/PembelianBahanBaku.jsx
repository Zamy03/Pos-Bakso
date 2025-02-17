import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function PembelianBahanBaku() {
  const [pembelian, setPembelian] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPembelian() {
      try {
        const response = await fetch("http://localhost:3000/pembelian/all");
        if (!response.ok) throw new Error("Failed to fetch pembelian data");
        const data = await response.json();
        setPembelian(data);
      } catch (error) {
        console.error("Error fetching pembelian data:", error);
      }
    }
    fetchPembelian();
  }, []);

  let no = 1;

  return (
    <Layout>
      <div className="pembelian">
        <div className="pembelian-header">
          <h2>Daftar Pembelian Bahan Baku</h2>
          <button className="add-pembelian-btn" onClick={() => navigate("/tambah-pembelian-bahan-baku")}>Tambah Pembelian</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Jumlah</th>
              <th>Satuan</th>
              <th>Harga Total</th>
              <th>Nama Supplier</th>
              <th>Tanggal Pembelian</th>
              <th>Bahan Baku</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pembelian.length > 0 ? (
              pembelian.map((data, index) => (
                <tr key={data.id_pembelian_bahan_baku || index}>
                  <td>{no++}</td>
                  <td>{data.jumlah}</td>
                  <td>{data.satuan}</td>
                  <td>{data.harga_total}</td>
                  <td>{data.nama_supplier}</td>
                  <td>{data.tanggal_pembelian}</td>
                  <td>{data.bahan_baku.nama_bahan}</td>
                  <td>
                    {/* <button onClick={() => handleEdit(index)}>Edit</button> */}
                    <button onClick={() => handleDelete(data.id_pembelian_bahan_baku)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Data pembelian tidak tersedia</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );

  // function handleEdit(index) {
  //   const selectedPembelian = pembelian[index];
  //   navigate("/edit-pembelian-bahan-baku", { state: { pembelian: selectedPembelian, index } });
  // }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pembelian ini?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/pembelian/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete pembelian");
      const updatedPembelian = pembelian.filter((item) => item.id_pembelian_bahan_baku !== id);
      setPembelian(updatedPembelian);
      alert("Pembelian berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting pembelian:", error);
      alert("Terjadi kesalahan saat menghapus pembelian");
    }
  }
}

export default PembelianBahanBaku;
