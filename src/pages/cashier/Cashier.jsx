import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const menuItems = [
  { id: 1, name: 'Bakso Kuah', price: 15000 },
  { id: 2, name: 'Bakso Urat', price: 20000 },
  { id: 3, name: 'Bakso Telur', price: 18000 },
  { id: 4, name: 'Es Teh', price: 5000 },
  { id: 5, name: 'Es Jeruk', price: 7000 },
];

function Cashier() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Layout>
      <div className="cashier">
        <h1>Warung Pos Bakso</h1>
        <div className="menu">
          <h2>Menu</h2>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item.id} className="menu-item">
                <h3>{item.name}</h3>
                <p className="menu-price">Rp {item.price.toLocaleString()}</p>
                <button onClick={() => addToCart(item)}>Tambah</button>
              </div>
            ))}
          </div>
        </div>
        <div className="cart">
          <h2>Keranjang</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} x Rp {item.price.toLocaleString()}
                  </span>
                  <button onClick={() => removeFromCart(item.id)}>Hapus</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Keranjang kosong</p>
          )}
          <h3>Total: Rp {calculateTotal().toLocaleString()}</h3>
        </div>
      </div>
    </Layout>
  );
}

export default Cashier;
