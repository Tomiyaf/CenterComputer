import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/admin/Dashboard"
import ProductDetail from "./pages/ProductDetail"
import ProductForm from "./pages/admin/ProductForm"
import CategoryManagement from "./pages/admin/CategoryManagement"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products/new" element={<ProductForm />} />
        <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
      </Routes>
    </Router>
  )
}
