import { getAppConfig } from "@/utils/config"

export interface Cart {
  id: number
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
  products: CartProduct[]
}

export interface CartProduct {
  id: number
  title: string
  price: number
  quantity: number
  total: number
  discountPercentage: number
  discountedPrice: number
}

export type GetCartsRequest = {
  page: number
}

export type GetCartsResponse = {
  carts: Cart[]
  limit: number
  skip: number
  total: number
}

export async function getCarts(req: GetCartsRequest) {
  const config = getAppConfig()
  const url = new URL(config.baseUrl + "carts")
  const limit = config.baseLimit
  const skip = (req.page - 1) * limit

  url.searchParams.append("limit", limit.toString())
  url.searchParams.append("skip", skip.toString())

  const res = await fetch(url)
  const data: GetCartsResponse = await res.json()

  return data
}

export type GetSingleCartRequest = {
  id: number
  page: number
}

export type GetSingleCartResponse = Cart

export async function getSingleCart(req: GetSingleCartRequest) {
  const config = getAppConfig()
  const url = new URL(config.baseUrl + "carts/" + req.id)
  const res = await fetch(url)
  let data: GetSingleCartResponse = await res.json()
  const products = getCartProductsByPage(req.page, config.cartDetailProductsLimit, data.products)
  data = {
    ...data,
    products,
  }
  return data
}

function getCartProductsByPage(page: number, limit: number, allProducts: CartProduct[]) {
  const start = (page - 1) * limit
  const end = start + limit
  return allProducts.slice(start, end)
}
