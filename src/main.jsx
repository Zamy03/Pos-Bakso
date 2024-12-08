import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Sidebar />
    <Dashboard title="Total Penjualan" value="Rp4,500,000" />
    <Dashboard title="Total Orderan" value="320" />
    <Dashboard title="Keuntungan" value="Rp1,600,000" />
  </StrictMode>
);
