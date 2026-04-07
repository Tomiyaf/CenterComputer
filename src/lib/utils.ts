import type { Product, FilterParams } from "../types"

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function filterAndSortProducts(
  products: Product[],
  { searchQuery, selectedCategory, selectedSubcategory, sortBy }: FilterParams,
): Product[] {
  return products
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
      return b.createdAt - a.createdAt
    })
}
