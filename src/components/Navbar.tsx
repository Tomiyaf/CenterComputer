import { Link, useNavigate } from "react-router-dom"
import { Search, ShoppingCart, User, LogOut, Settings } from "lucide-react"
import { isLoggedIn, logout } from "../lib/storage"
import React, { useState, useEffect } from "react"

interface NavbarProps {
  onSearch?: (query: string) => void
}

export default function Navbar({ onSearch }: NavbarProps) {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsAdmin(isLoggedIn())
  }, [])

  const handleLogout = () => {
    logout()
    setIsAdmin(false)
    navigate("/")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <ShoppingCart size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              CenterComputer
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-4 sm:px-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="Cari produk elektronik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  to="/admin"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Settings size={20} />
                  <span className="hidden sm:block text-sm font-medium">
                    Dashboard
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:block text-sm font-medium">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <User size={20} />
                <span className="hidden sm:block text-sm font-medium">
                  Login Admin
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
