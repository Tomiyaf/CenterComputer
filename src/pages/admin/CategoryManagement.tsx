import React, { useState, useEffect } from "react"
import AdminLayout from "../../components/AdminLayout"
import {
  getCategories,
  saveCategory,
  updateCategory,
  deleteCategory,
  addSubcategory,
  removeSubcategory,
} from "../../lib/storage"
import type { Category } from "../../types"
import { Plus, Edit2, Trash2, X } from "lucide-react"

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])

  // State for new/edit category
  const [isEditingCategory, setIsEditingCategory] = useState<string | null>(
    null,
  )
  const [categoryNameInput, setCategoryNameInput] = useState("")

  // State for new subcategory
  const [activeSubcategoryInput, setActiveSubcategoryInput] = useState<
    string | null
  >(null)
  const [subcategoryNameInput, setSubcategoryNameInput] = useState("")

  const loadCategories = () => {
    setCategories(getCategories())
  }

  useEffect(() => {
    loadCategories()
  }, [])

  // --- Category Handlers ---
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryNameInput.trim()) return

    if (isEditingCategory === "NEW") {
      saveCategory(categoryNameInput.trim())
    } else if (isEditingCategory) {
      updateCategory(isEditingCategory, categoryNameInput.trim())
    }

    setCategoryNameInput("")
    setIsEditingCategory(null)
    loadCategories()
  }

  const handleDeleteCategory = (id: string, name: string) => {
    if (window.confirm(`Konfirmasi hapus kategori: "${name}"?`)) {
      deleteCategory(id)
      loadCategories()
    }
  }

  const startEditCategory = (cat: Category) => {
    setIsEditingCategory(cat.id)
    setCategoryNameInput(cat.name)
  }

  const cancelEditCategory = () => {
    setIsEditingCategory(null)
    setCategoryNameInput("")
  }

  // --- Subcategory Handlers ---
  const handleSaveSubcategory = (e: React.FormEvent, categoryId: string) => {
    e.preventDefault()
    if (!subcategoryNameInput.trim()) return

    addSubcategory(categoryId, subcategoryNameInput.trim())
    setSubcategoryNameInput("")
    setActiveSubcategoryInput(null)
    loadCategories()
  }

  const handleDeleteSubcategory = (
    categoryId: string,
    subcategoryName: string,
  ) => {
    if (window.confirm(`Hapus subkategori "${subcategoryName}"?`)) {
      removeSubcategory(categoryId, subcategoryName)
      loadCategories()
    }
  }

  return (
    <AdminLayout>
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Manajemen Kategori
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Atur kategori & subkategori untuk pengelompokan produk.
            </p>
          </div>
          {isEditingCategory !== "NEW" && (
            <button
              onClick={() => {
                setIsEditingCategory("NEW")
                setCategoryNameInput("")
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow active:scale-95"
            >
              <Plus size={18} />
              Tambah Kategori
            </button>
          )}
        </div>

        {/* Form Create Category */}
        {isEditingCategory === "NEW" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 animate-in fade-in slide-in-from-top-4">
            <form onSubmit={handleSaveCategory} className="flex gap-4">
              <input
                type="text"
                autoFocus
                placeholder="Nama Kategori Baru..."
                value={categoryNameInput}
                onChange={(e) => setCategoryNameInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={cancelEditCategory}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
            >
              {isEditingCategory === cat.id ? (
                <form
                  onSubmit={handleSaveCategory}
                  className="flex gap-2 items-center w-full"
                >
                  <input
                    type="text"
                    autoFocus
                    value={categoryNameInput}
                    onChange={(e) => setCategoryNameInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditCategory}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </form>
              ) : (
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800">
                    {cat.name}
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEditCategory(cat)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Kategori"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id, cat.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus Kategori"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">
                  Subkategori:
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  {cat.subcategories.map((sub, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1 rounded-full group"
                    >
                      {sub}
                      <button
                        onClick={() => handleDeleteSubcategory(cat.id, sub)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all focus:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  {activeSubcategoryInput !== cat.id && (
                    <button
                      onClick={() => {
                        setActiveSubcategoryInput(cat.id)
                        setSubcategoryNameInput("")
                      }}
                      className="inline-flex items-center justify-center w-7 h-7 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                      title="Tambah Subkategori"
                    >
                      <Plus size={14} />
                    </button>
                  )}
                </div>

                {activeSubcategoryInput === cat.id && (
                  <form
                    onSubmit={(e) => handleSaveSubcategory(e, cat.id)}
                    className="mt-3 flex gap-2"
                  >
                    <input
                      type="text"
                      autoFocus
                      placeholder="Nama Subkategori..."
                      value={subcategoryNameInput}
                      onChange={(e) => setSubcategoryNameInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Tambah
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSubcategoryInput(null)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
