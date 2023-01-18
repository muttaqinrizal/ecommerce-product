import { getAppConfig } from "@/utils/config"
import { NextRouter } from "next/router"
import { Product } from "./products"

export interface Option {
  value: string
  label: string
}

export type HandleChangeFilterInput = {
  router: NextRouter
  queryKey: string
  queryValue: string
  toggleQuery: "ADD" | "REMOVE"
}

export function handleChangeFilter(input: HandleChangeFilterInput) {
  const isAddNewQuery = input.toggleQuery === "ADD"
  const urlWithNewFilter = getFilterUrl(isAddNewQuery, input.router, input.queryKey, input.queryValue)
  input.router.push(urlWithNewFilter)
}

export function getFilterUrl(isAddQuery: boolean, router: NextRouter, queryKey: string, queryValue: string) {
  const params = new URLSearchParams(router.query as any)

  if (params.has(queryKey)) params.delete(queryKey)
  if (params.has("page")) params.delete("page")
  if (isAddQuery) params.append(queryKey, queryValue.toLowerCase())

  return router.pathname + "?" + decodeURIComponent(params.toString())
}

export type GetCategoriesResponse = string[]

export async function getCategories() {
  const url = new URL(getAppConfig().baseUrl + "products/categories")
  const res = await fetch(url)
  const data: GetCategoriesResponse = await res.json()
  return data.map(category => ({
    value: category,
    label: category,
  }))
}

export function getBrands(products: Product[]) {
  const brands: Option[] = []
  return products.reduce((currentBrands, currentProduct) => {
    const isExist = currentBrands.find(brand =>
      brand.value.toLowerCase() === currentProduct.brand.toLowerCase()
    )
    if (isExist) return currentBrands
    return [
      ...currentBrands,
      {
        value: currentProduct.brand,
        label: currentProduct.brand
      },
    ]
  }, brands)
}

export const priceOptions: Option[] = [
  { value: "10", label: "$10.00" },
  { value: "50", label: "$50.00" },
  { value: "100", label: "$100.00" },
  { value: "500", label: "$500.00" },
  { value: "1000", label: "$1,000.00" },
]
