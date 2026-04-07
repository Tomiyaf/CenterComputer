import { useState, useEffect } from "react"
import type { Product, Category } from "../types"
import { getProducts, initializeData } from "../lib/storage"
import ProductCard from "../components/ProductCard"
import { SlidersHorizontal } from "lucide-react"
import Navbar from "../components/Navbar"
import FilterSidebar from "../components/FilterSidebar"

type SortOption = "newest" | "price-asc" | "price-desc"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null,
  )
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  useEffect(() => {
    initializeData()
    setProducts(getProducts())
  }, [])

  const filteredAndSortedProducts = products
    .filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory
        ? p.category === selectedCategory
        : true
      const matchesSubcategory = selectedSubcategory
        ? p.subcategory === selectedSubcategory
        : true
      return matchesSearch && matchesCategory && matchesSubcategory
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      return b.createdAt - a.createdAt // newest
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Produk Kami</h1>
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700"
            >
              <SlidersHorizontal size={16} />
              Filter
            </button>
          </div>

          {/* Sidebar */}
          <div
            className={`lg:w-64 flex-shrink-0 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="sticky top-24">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onSelectCategory={setSelectedCategory}
                onSelectSubcategory={setSelectedSubcategory}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedCategory ? selectedCategory : "Semua Produk"}
                {selectedSubcategory && (
                  <span className="text-gray-500 font-normal text-lg ml-2">
                    / {selectedSubcategory}
                  </span>
                )}
              </h1>

              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-sm text-gray-600">
                  Urutkan:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="newest">Terbaru</option>
                  <option value="price-asc">Harga: Rendah ke Tinggi</option>
                  <option value="price-desc">Harga: Tinggi ke Rendah</option>
                </select>
              </div>
            </div>

            {/* Mobile Sort (visible only on mobile) */}
            <div className="lg:hidden mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="newest">Terbaru</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
              </select>
            </div>

            {/* Product Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg">
                  Tidak ada produk yang ditemukan.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                    setSelectedSubcategory(null)
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
