import Head from "next/head"
import PageContainer from "@/components/PageContainer"
import ContentContainer from "@/components/ContentContainer"
import SideBar from "@/components/SideBar"
import BottomNavBar from "@/components/BottomNavBar"
import DataTable, { TableHeader } from "@/components/DataTable"
import Pagination from "@/components/Pagination"
import SelectFilter from "@/components/SelectFilter"
import SearchInput from "@/components/SearchInput"
import { getAppConfig } from "@/utils/config"
import { GetServerSideProps } from "next"
import { getProducts, filterProductsByQuery, GetProductsResponse } from "@/lib/products"
import { getPagination, Pagination as PaginationType } from "@/lib/pagination"
import { getCategories, getBrands, priceOptions, Option } from "@/lib/filter"
import { getQueryUrl } from "@/utils/urlParser"
import { formatNumberToUSD } from "@/utils/common"
import Image from "next/image"

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = parseInt(getQueryUrl("page", context) ?? "1")
  if (page < 1) page = 1

  const category = getQueryUrl("category", context)
  const brand = getQueryUrl("brand", context)
  const name = getQueryUrl("name", context)
  const minPrice = getQueryUrl("minprice", context)
  const maxPrice = getQueryUrl("maxprice", context)

  let data = await getProducts({
    page,
    category,
    brand,
    name,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
  })

  const categories = await getCategories()
  const brands = getBrands(data.allProducts)

  if (category || brand || name || minPrice || maxPrice) {
    data = filterProductsByQuery({
      req: {
        page,
        category,
        brand,
        name,
        minPrice: minPrice ? parseInt(minPrice) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      },
      products: data.allProducts,
    })
  }

  const pagination = getPagination({
    currentPage: page,
    limit: getAppConfig().baseLimit,
    countCurrentPage: data.products.length,
    countAll: data.total,
    path: "products",
    queries: context.query,
  })

  return {
    props: {
      data,
      pagination,
      categories,
      brands,
    }
  }
}

type Props = {
  data: GetProductsResponse
  pagination: PaginationType
  categories: Option[]
  brands: Option[]
  chartLabels: string[]
  itemsPerBrand: number[]
}

export default function ProductListPage({ data, pagination, categories, brands, chartLabels, itemsPerBrand }: Props) {
  const tableHeaders: TableHeader[] = [
    { title: "No" },
    { title: "Images" },
    { title: "Product Name" },
    { title: "Brand" },
    { title: "Price" },
    { title: "Stock" },
    { title: "Category" }
  ]
  const productRowComponents = data.products.map(product =>
    <tr key={product.id}>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium">{product.id}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <Image src={product.thumbnail} width={50} height={50} alt="images" />
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium">{product.title}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{product.brand}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left text-green-500 font-medium">{formatNumberToUSD(product.price)}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{product.stock}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{product.category}</div>
      </td>
    </tr>
  )

  return (
    <PageContainer>
      <Head>
        <title>Product List</title>
      </Head>
      <SideBar />
      <BottomNavBar />
      <ContentContainer>
        <h2 className="text-gray-700 text-2xl font-semibold pl-2 mb-3">Products</h2>
        <h2 className="text-gray-700 font-semibold pl-2 mb-3">Filters</h2>
        <div className="w-full bg-transparent p-3 mb-5  rounded-lg flex flex-col md:flex-row">
          <div className="flex flex-auto flex-col md:flex-row">
            <div className="flex flex-auto flex-col lg:flex-row">
              <div className="flex-1 mb-3 md:mr-4">
                <SelectFilter
                  label="Category"
                  options={categories}
                  query="category"
                  placeHolder="Select Category"
                />
              </div>
              <div className="flex-1 mb-3 md:mr-4">
                <SelectFilter
                  label="Brand"
                  options={brands}
                  query="brand"
                  placeHolder="Select Brand"
                />
              </div>
            </div>
            <div className="flex flex-auto flex-col lg:flex-row">
              <div className="flex-1 mb-3 md:mr-4">
                <SelectFilter
                  label="Min Price"
                  options={priceOptions}
                  query="minprice"
                  placeHolder="Select Min Price"
                />
              </div>
              <div className="flex-1 mb-3 md:mr-4">
                <SelectFilter
                  label="Max Price"
                  options={priceOptions}
                  query="maxprice"
                  placeHolder="Select Max Price"
                />
              </div>
            </div>
          </div>
          <div className="flex-auto">
            <SearchInput query="name" />
          </div>
        </div>
        <DataTable
          headers={tableHeaders}
          rowsComponent={productRowComponents}
          countItems={data.products.length}
        />
        <Pagination pagination={pagination} />
      </ContentContainer>
    </PageContainer>
  )
}
