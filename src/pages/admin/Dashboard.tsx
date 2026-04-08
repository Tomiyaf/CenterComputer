import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AdminLayout from "../../components/AdminLayout"
import { getProducts, deleteProduct } from "../../lib/storage"
import type { Product } from "../../types"
import { Edit, Trash2, Plus } from "lucide-react"

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])

  const loadProducts = () => {
    setProducts(getProducts())
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id)
      loadProducts()
    }
  }

  return (
    <AdminLayout>
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Manajemen Produk
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola data produk di toko Anda.
            </p>
          </div>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow active:scale-95"
          >
            <Plus size={18} />
            Tambah Produk
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                  <th className="p-4 font-medium">Gambar</th>
                  <th className="p-4 font-medium">Nama Produk</th>
                  <th className="p-4 font-medium">Kategori</th>
                  <th className="p-4 font-medium">Harga</th>
                  <th className="p-4 font-medium text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Belum ada produk yang ditambahkan.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-xl border border-gray-100 bg-gray-50"
                        />
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-800">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {product.description}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {product.category}
                        </span>
                        <div className="text-xs text-gray-500 mt-1 pl-1">
                          ↳ {product.subcategory}
                        </div>
                      </td>
                      <td className="p-4 text-gray-700 font-medium whitespace-nowrap">
                        Rp {product.price.toLocaleString("id-ID")}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(product.id, product.name)
                            }
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
