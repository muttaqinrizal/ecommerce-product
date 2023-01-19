import { Option } from "./filter"
import { Product } from "./products"

export function getBrandsLabel(brands: Option[]) {
  return brands.map(brand => brand.label)
}

export function countItemsPerBrand(brands: Option[], products: Product[]) {
  return brands.map(brand =>
    products.reduce((counter, product) => {
      if (brand.label.toLowerCase() === product.brand.toLowerCase()) {
        return counter += 1
      }
      return counter
    }, 0)
  )
}
