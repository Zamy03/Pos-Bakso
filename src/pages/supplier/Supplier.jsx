import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import supplierData from "../../data/supplier.json";

function Supplier() {
  const [supplier, setSupplier] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("supplier")) || [];
    setSupplier([...supplierData, ...localStorageData]);
  }, []);

  let no = 1;

  return (
    <Layout>
      <div className= "supply">
        <div className="supplier-header">
          <h2>Daftar Supplier</h2>
          <button
            className="add-supplier-btn"
            onClick={() => navigate("/tambah-supplier")}>
            Tambah Supplier
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Nama Supplier</th>
              <th>Jenis Barang</th>
              <th>Alamat Supplier</th>
              <th>No. Telepon</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {supplier.map((data, index) => (
              <tr key={index}>
                <td data-label="No">{no++}</td>
                <td data-label="ID">{data.id || data.id_supplier}</td>
                <td data-label="Nama Supplier">{data.nama || data.nama_supp}</td>
                <td data-label="Jenis Supply">{data.jenis || data.jenis_supp}</td>
                <td data-label="Alamat">{data.alamat || data.alamat}</td>
                <td data-label="Alamat">{data.alamat || data.alamat}</td>
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

  function handleDelete(index) {
    const updatedSupplier = [...supplier];
    updatedSupplier.splice(index, 1);
    setSupplier(updatedSupplier);
    localStorage.setItem(
      "supplier",
      JSON.stringify(updatedSupplier.filter((item) => !supplierDataData.includes(item)))
    );
  }
}

export default Supplier;
