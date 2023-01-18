import { getAppConfig } from "@/utils/config"

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export type GetProductsRequest = {
  page: number
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  name?: string
}

export type GetProductsResponse = {
  products: Product[]
  limit: number
  skip: number
  total: number
  allProducts: Product[]
}

export async function getProducts(req: GetProductsRequest) {
  const config = getAppConfig()
  const url = new URL(config.baseUrl + "products")
  const limit = config.allProduct
  const skip = 0

  url.searchParams.append("limit", limit.toString())
  url.searchParams.append("skip", skip.toString())

  const res = await fetch(url)
  const data: GetProductsResponse = await res.json()

  const total = data.products.length
  const start = (req.page - 1) * config.baseLimit
  const end = start + config.baseLimit
  const products = data.products.slice(start, end)

  const output: GetProductsResponse = {
    products,
    allProducts: data.products,
    limit: products.length > 0 ? config.baseLimit : total,
    skip: start,
    total,
  }
  return output
}

export type FilterProductsByQueryInput = {
  req: GetProductsRequest
  products: Product[]
}

export function filterProductsByQuery(input: FilterProductsByQueryInput) {
  const filteredProducts = input.products
    .filter(product => {
      if (input.req.category) return product.category.toLowerCase() === input.req.category.toLowerCase()
      return true
    })
    .filter(product => {
      if (input.req.brand) return product.brand.toLowerCase() === input.req.brand.toLowerCase()
      return true
    })
    .filter(product => {
      if (input.req.minPrice && input.req.maxPrice) {
        return product.price >= input.req.minPrice && product.price <= input.req.maxPrice
      } else if (input.req.minPrice && !input.req.maxPrice) {
        return product.price >= input.req.minPrice
      } else if (!input.req.minPrice && input.req.maxPrice) {
        return product.price <= input.req.maxPrice
      }
      return true
    })
    .filter(product => {
      if (input.req.name) return product.title.toLowerCase().includes(input.req.name.toLowerCase())
      return true
    })

  const config = getAppConfig()
  const total = filteredProducts.length
  const start = (input.req.page - 1) * config.baseLimit
  const end = start + config.baseLimit
  const products = filteredProducts.slice(start, end)

  const filteredData: GetProductsResponse = {
    products: products,
    allProducts: filteredProducts,
    limit: products.length > 0 ? config.baseLimit : total,
    skip: start,
    total,
  }

  return filteredData
}
