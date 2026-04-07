import { describe, it, expect } from "vitest"
import { formatRupiah } from "./formatRupiah"

const normalize = (value: string) => value.replace(/\s/g, "")

describe("formatRupiah", () => {
  it("memformat angka menjadi Rupiah", () => {
    expect(normalize(formatRupiah(20000000))).toBe("Rp20.000.000")
  })

  it("memformat nol", () => {
    expect(normalize(formatRupiah(0))).toBe("Rp0")
  })

  it("membulatkan desimal karena fraction digit = 0", () => {
    expect(normalize(formatRupiah(1500.75))).toBe("Rp1.501")
  })

  it("tetap memformat angka negatif sebagai mata uang", () => {
    const result = normalize(formatRupiah(-1000))
    expect(result).toContain("Rp")
    expect(result).toContain("1.000")
    expect(result).toContain("-")
  })
})
