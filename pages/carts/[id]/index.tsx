import Head from "next/head"
import PageContainer from "@/components/PageContainer"
import SideBar from "@/components/SideBar"
import BottomNavBar from "@/components/BottomNavBar"
import ContentContainer from "@/components/ContentContainer"
import DataTable, { TableHeader } from "@/components/DataTable"
import Pagination from "@/components/Pagination"
import dayjs from "dayjs"
import { GetServerSideProps } from "next"
import { getSingleCart, GetSingleCartResponse } from "@/lib/carts"
import { getPagination, Pagination as PaginationType } from "@/lib/pagination"
import { getUser, GetUserResponse } from "@/lib/user"
import { getAppConfig } from "@/utils/config"
import { formatNumberToUSD } from "@/utils/common"
import { getParamUrl, getQueryUrl } from "@/utils/urlParser"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = getParamUrl("id", context)

  if (id && id !== "") {
    let page = parseInt(getQueryUrl("page", context) ?? "1")
    if (page < 1) page = 1

    const data = await getSingleCart({
      id: parseInt(id),
      page,
    })

    const user = await getUser({ id: data.userId })

    const pagination = getPagination({
      currentPage: page,
      limit: getAppConfig().cartDetailProductsLimit,
      countCurrentPage: data.products.length,
      countAll: data.totalProducts,
      path: "carts/" + id,
      queries: context.query,
    })

    return {
      props: {
        id,
        data,
        pagination,
        user,
      }
    }
  }

  return {
    props: {},
    redirect: "/carts",
  }
}

type Props = {
  id: string
  data: GetSingleCartResponse
  pagination: PaginationType
  user: GetUserResponse
}

export default function CartDetailPage({ id, data, pagination, user }: Props) {
  const tableHeaders: TableHeader[] = [
    { title: "Product Name" },
    { title: "Price" },
    { title: "Quantity" },
    { title: "Total Price" },
  ]
  const cartProductRowsComponent = data.products.map(product =>
    <tr key={product.id}>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium">{product.title}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left text-emerald-500 font-medium">{formatNumberToUSD(product.price)}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{product.quantity}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left text-emerald-500 font-medium">{formatNumberToUSD(product.total)}</div>
      </td>
    </tr>
  )

  return (
    <PageContainer>
      <Head>
        <title>Cart Detail</title>
      </Head>
      <SideBar />
      <BottomNavBar />
      <ContentContainer>
        <h1 className="text-gray-700 font-semibold p-2 mb-5">Cart {id}</h1>
        <h2 className="text-gray-700 font-semibold pl-2 mb-3">Details</h2>
        <div className="w-full max-w-6xl bg-slate-50 p-3 mb-5 shadow rounded-sm">
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-2 py-2 font-semibold">User</div>
                <div className="px-2 py-2">: {user.firstName} {user.lastName}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-2 py-2 font-semibold"># of items</div>
                <div className="px-2 py-2">: {data.totalQuantity}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-2 py-2 font-semibold">Phone</div>
                <div className="px-2 py-2">: {user.phone}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-2 py-2 font-semibold">Total Amount</div>
                <div className="px-2 py-2 text-emerald-500 font-medium">: {formatNumberToUSD(data.total)}</div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-gray-700 font-semibold p-2">Products</h2>
        <DataTable
          headers={tableHeaders}
          rowsComponent={cartProductRowsComponent}
          countItems={data.products.length}
        />
        <Pagination pagination={pagination} />
      </ContentContainer>
    </PageContainer>
  )
}
