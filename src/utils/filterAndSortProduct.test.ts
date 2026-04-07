import { describe, it, expect } from "vitest"
import { filterAndSortProducts } from "./filterAndSortProduct"
import type { Product, FilterParams } from "../types"

const products: Product[] = [
  {
    id: "1",
    name: "Laptop Gaming",
    category: "Laptop",
    subcategory: "Gaming",
    price: 20000000,
    image: "img-1",
    description: "desc-1",
    createdAt: 3000,
  },
  {
    id: "2",
    name: "Mouse Wireless",
    category: "Aksesoris",
    subcategory: "Mouse",
    price: 250000,
    image: "img-2",
    description: "desc-2",
    createdAt: 1000,
  },
  {
    id: "3",
    name: "Laptop Office",
    category: "Laptop",
    subcategory: "Office",
    price: 12000000,
    image: "img-3",
    description: "desc-3",
    createdAt: 2000,
  },
  {
    id: "4",
    name: "Keyboard Mechanical",
    category: "Aksesoris",
    subcategory: "Keyboard",
    price: 750000,
    image: "img-4",
    description: "desc-4",
    createdAt: 4000,
  },
]

function makeParams(overrides: Partial<FilterParams> = {}): FilterParams {
  return {
    searchQuery: "",
    selectedCategory: null,
    selectedSubcategory: null,
    sortBy: "newest",
    ...overrides,
  }
}

describe("filterAndSortProducts", () => {
  it("memfilter berdasarkan searchQuery (case-insensitive)", () => {
    const result = filterAndSortProducts(
      products,
      makeParams({ searchQuery: "lApToP" }),
    )

    expect(result).toHaveLength(2)
    expect(result.map((p) => p.name)).toEqual([
      "Laptop Gaming",
      "Laptop Office",
    ])
  })

  it("memfilter berdasarkan category", () => {
    const result = filterAndSortProducts(
      products,
      makeParams({ selectedCategory: "Aksesoris" }),
    )

    expect(result).toHaveLength(2)
    expect(result.every((p) => p.category === "Aksesoris")).toBe(true)
  })

  it("memfilter berdasarkan subcategory", () => {
    const result = filterAndSortProducts(
      products,
      makeParams({ selectedSubcategory: "Gaming" }),
    )

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe("Laptop Gaming")
  })

  it("memfilter gabungan search + category + subcategory", () => {
    const result = filterAndSortProducts(
      products,
      makeParams({
        searchQuery: "laptop",
        selectedCategory: "Laptop",
        selectedSubcategory: "Office",
      }),
    )

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe("Laptop Office")
  })

  it("sorting price ascending saat sortBy='price-asc'", () => {
    const result = filterAndSortProducts(
      products,
      makeParams({ sortBy: "price-asc" }),
    )

    expect(result.map((p) => p.price)).toEqual([
      250000, 750000, 12000000, 20000000,
    ])
  })

  it("sorting price descending saat sortBy='price-desc'", () => {
    const result = filterAndSortProducts(
      products,
      makeParams({ sortBy: "price-desc" }),
    )

    expect(result.map((p) => p.price)).toEqual([
      20000000, 12000000, 750000, 250000,
    ])
  })

  it("default sorting by createdAt descending saat sortBy='newest'", () => {
    const result = filterAndSortProducts(
      products,
      makeParams({ sortBy: "newest" }),
    )

    expect(result.map((p) => p.createdAt)).toEqual([4000, 3000, 2000, 1000])
  })

  it("mengembalikan array kosong jika input products kosong", () => {
    const result = filterAndSortProducts(
      [],
      makeParams({ searchQuery: "apa saja", sortBy: "price-asc" }),
    )

    expect(result).toEqual([])
  })
})
