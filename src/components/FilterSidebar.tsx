import type { Category } from "../types"
import { ChevronDown, ChevronRight } from "lucide-react"
import React, { useState } from "react"

interface FilterSidebarProps {
  categories: Category[]
  selectedCategory: string | null
  selectedSubcategory: string | null
  onSelectCategory: (category: string | null) => void
  onSelectSubcategory: (subcategory: string | null) => void
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  onSelectSubcategory,
}: FilterSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({})

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h3>

      <div className="space-y-2">
        <button
          onClick={() => {
            onSelectCategory(null)
            onSelectSubcategory(null)
          }}
          className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Semua Produk
        </button>

        {categories.map((category) => {
          const isExpanded = expandedCategories[category.id]
          const isSelected = selectedCategory === category.name

          return (
            <div key={category.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    onSelectCategory(category.name)
                    onSelectSubcategory(null)
                  }}
                  className={`flex-1 text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isSelected && selectedSubcategory === null
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                </button>
                {category.subcategories.length > 0 && (
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {isExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                )}
              </div>

              {isExpanded && category.subcategories.length > 0 && (
                <div className="ml-4 pl-2 border-l border-gray-200 space-y-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        onSelectCategory(category.name)
                        onSelectSubcategory(sub)
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                        isSelected && selectedSubcategory === sub
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
