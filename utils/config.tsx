import getConfig from "next/config"
import { NextConfig } from "next"

const { serverRuntimeConfig }: NextConfig = getConfig()

export interface Config {
  baseUrl: string
  allProduct: number
  baseLimit: number
  cartDetailProductsLimit: number
}

export function getAppConfig() {
  const config: Config = {
    baseUrl: serverRuntimeConfig?.baseUrl ?? "",
    allProduct: serverRuntimeConfig?.allProduct ?? 0,
    baseLimit: serverRuntimeConfig?.baseLimit ?? 0,
    cartDetailProductsLimit: serverRuntimeConfig?.cartDetailProductsLimit ?? 0,
  }
  return config
}
