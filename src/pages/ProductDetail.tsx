import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import type { Product } from "../types"
import { getProductById } from "../lib/storage"
import Navbar from "../components/Navbar"
import { formatRupiah } from "../lib/utils"
import { ArrowLeft } from "lucide-react"

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (id) {
      const found = getProductById(id)
      if (found) {
        setProduct(found)
      } else {
        navigate("/")
      }
    }
  }, [id, navigate])

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Katalog</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full h-auto max-h-[500px] object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800"
                }}
              />
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {product.category}
                </span>
                <span>/</span>
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {product.subcategory}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-3xl font-bold text-blue-600 mb-8">
                {formatRupiah(product.price)}
              </p>

              <div className="prose prose-sm sm:prose-base text-gray-600 mb-8 flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Deskripsi Produk
                </h3>
                <p className="whitespace-pre-line">{product.description}</p>
              </div>

              <div className="text-md">
                <span className="text-gray-500">Status Ketersediaan: </span>
                <span className="text-green-500 font-medium">Tersedia</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
