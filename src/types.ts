export interface Product {
  id: string
  name: string
  price: number
  category: string
  subcategory: string
  image: string
  description: string
  createdAt: number
}

export interface Category {
  id: string
  name: string
  subcategories: string[]
}

export interface User {
  username: string
  isLoggedIn: boolean
}

export interface FilterParams {
  searchQuery: string
  selectedCategory: string | null
  selectedSubcategory: string | null
  sortBy: "newest" | "price-asc" | "price-desc"
}
