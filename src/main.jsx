import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Menu from './pages/Menu.jsx'
import Penjualan from './pages/Penjualan.jsx'
import TambahMenu from './pages/TambahMenu.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/penjualan' element={<Penjualan/>}/>
        <Route path='/tambah-menu' element={<TambahMenu/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)