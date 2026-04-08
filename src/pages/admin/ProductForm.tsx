import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import AdminLayout from "../../components/AdminLayout"
import {
  getCategories,
  getProductById,
  saveProduct,
  updateProduct,
} from "../../lib/storage"
import type { Category } from "../../types"
import { ArrowLeft, Save } from "lucide-react"

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [categories, setCategories] = useState<Category[]>([])

  // Form State
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [subcategory, setSubcategory] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const loadedCategories = getCategories()
    setCategories(loadedCategories)

    if (isEditMode && id) {
      const product = getProductById(id)
      if (product) {
        setName(product.name)
        setPrice(product.price.toString())
        setCategory(product.category)
        setSubcategory(product.subcategory)
        setImage(product.image)
        setDescription(product.description)
      } else {
        navigate("/admin") // Product not found
      }
    } else if (loadedCategories.length > 0) {
      // Set default category for new product
      setCategory(loadedCategories[0].name)
      if (loadedCategories[0].subcategories.length > 0) {
        setSubcategory(loadedCategories[0].subcategories[0])
      }
    }
  }, [id, isEditMode, navigate])

  const selectedCategoryObj = categories.find((c) => c.name === category)

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value
    setCategory(newCategory)

    // Automatically set the first subcategory of the newly selected category
    const foundCategory = categories.find((c) => c.name === newCategory)
    if (foundCategory && foundCategory.subcategories.length > 0) {
      setSubcategory(foundCategory.subcategories[0])
    } else {
      setSubcategory("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      name,
      price: Number(price),
      category,
      subcategory,
      image,
      description,
    }

    if (isEditMode && id) {
      updateProduct(id, productData)
    } else {
      saveProduct(productData)
    }

    navigate("/admin")
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Produk" : "Tambah Produk Baru"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Masukkan detail produk dengan lengkap.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Produk
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Misal: Laptop ASUS ROG"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga (Rp)
              </label>
              <input
                type="number"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Misal: 15000000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  required
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subkategori
                </label>
                <select
                  required
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  disabled={
                    !selectedCategoryObj ||
                    selectedCategoryObj.subcategories.length === 0
                  }
                >
                  {selectedCategoryObj?.subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Gambar
              </label>
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              {image && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Preview:</p>
                  <img
                    src={image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-xl border border-gray-100"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/150?text=Invalid+Image"
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                placeholder="Deskripsi produk Anda..."
              />
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow active:scale-95"
              >
                <Save size={18} />
                {isEditMode ? "Simpan Perubahan" : "Simpan Produk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
