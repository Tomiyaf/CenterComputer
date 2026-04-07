import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/admin/Dashboard"
import ProductDetail from "./pages/ProductDetail"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}
