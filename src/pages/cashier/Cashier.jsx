import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function Cashier() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Fetch menu data
  useEffect(() => {
    fetch("http://localhost:3000/api/menus/")
      .then((response) => response.json())
      .then((data) => {
        setMenu(data.filter((item) => item.tersedia === true));
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  // Fetch transaction data
  useEffect(() => {
    fetch("http://localhost:3000/transaksi/all")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id_menu);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id_menu
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, id: item.id_menu, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.harga * item.quantity, 0);
  };

  // Handle submit transaction
  const handleSubmit = async () => {
    try {
      for (let item of cart) {
        const transactionData = {
          id_menu: item.id,
          jumlah: item.quantity,
        };

        const response = await fetch("http://localhost:3000/transaksi/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Pastikan token JWT disimpan di localStorage
          },
          body: JSON.stringify(transactionData),
        });

        if (!response.ok) {
          throw new Error("Error in creating transaction");
        }

        const data = await response.json();
        console.log("Transaction success:", data);
      }

      alert("Transaksi berhasil!");
      setCart([]); // Clear cart after successful transaction
      fetch("http://localhost:3000/transaksi/all") // Refresh transactions
        .then((response) => response.json())
        .then((data) => setTransactions(data));
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Transaksi gagal, silakan coba lagi.");
    }
  };

  return (
    <Layout>
      <div className="cashier">
        <h1>Warung Pos Bakso</h1>

        {/* Daftar Menu */}
        <h2>Daftar Menu</h2>
        <div className="menu-list" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {menu.length > 0 ? (
            menu.map((item) => (
              <div
                key={item.id_menu}
                className="menu-card"
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <h3>{item.nama_menu}</h3>
                <p>Kategori: {item.kategori}</p>
                <p>Harga: Rp {item.harga.toLocaleString()}</p>
                <button onClick={() => addToCart(item)}>Tambah</button>
              </div>
            ))
          ) : (
            <p>Menu belum tersedia</p>
          )}
        </div>

        {/* Keranjang */}
        <div className="cart">
          <h2>Keranjang</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <span>{item.nama_menu}</span>
                  <span>
                    {item.quantity} x Rp {item.harga.toLocaleString()}
                  </span>
                  <button onClick={() => removeFromCart(item.id)}>Hapus</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Keranjang kosong</p>
          )}
          <h3>Total: Rp {calculateTotal().toLocaleString()}</h3>
          <button onClick={handleSubmit} disabled={cart.length === 0}>
            Submit Transaksi
          </button>
        </div>

        {/* Data Transaksi */}
        <div className="transactions">
          <h2>Data Transaksi</h2>
          <table
            border="1"
            style={{ width: "100%", textAlign: "left", marginTop: "10px" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Menu</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((trx) => (
                  <tr key={trx.transaksi_id}>
                    <td>{trx.id_menu}</td>
                    <td>{trx.nama_menu}</td>
                    <td>{trx.jumlah}</td>
                    <td>Rp {trx.total_harga.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Belum ada transaksi</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}




export default Cashier;
