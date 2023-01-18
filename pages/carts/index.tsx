import Head from "next/head"
import PageContainer from "@/components/PageContainer"
import ContentContainer from "@/components/ContentContainer"
import SideBar from "@/components/SideBar"
import BottomNavBar from "@/components/BottomNavBar"
import DataTable, { TableHeader } from "@/components/DataTable"
import Pagination from "@/components/Pagination"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { getAppConfig } from "@/utils/config"
import { formatNumberToUSD } from "@/utils/common"
import { getQueryUrl } from "@/utils/urlParser"
import { getCarts, GetCartsResponse } from "@/lib/carts"
import { getPagination, Pagination as PaginationType } from "@/lib/pagination"

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = parseInt(getQueryUrl("page", context) ?? "1")
  if (page < 1) page = 1

  let data = await getCarts({ page })

  const pagination = getPagination({
    currentPage: page,
    limit: getAppConfig().baseLimit,
    countCurrentPage: data.carts.length,
    countAll: data.total,
    path: "carts",
    queries: context.query,
  })

  return {
    props: {
      data,
      pagination,
    }
  }
}

type Props = {
  data: GetCartsResponse
  pagination: PaginationType
}

export default function CartListPage({ data, pagination }: Props) {
  const tableHeaders: TableHeader[] = [
    { title: "Cart" },
    { title: "User ID" },
    { title: "Total Items" },
    { title: "Total Price" },
  ]
  const cartRowComponents = data.carts.map(cart =>
    <tr key={cart.id}>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">
          <Link
            href={`/carts/${cart.id}`}
            className="flex items-center justify-center font-medium w-40 py-1 border border-gray-200 bg-gray-100 text-gray-700 rounded-md transition ease select-none hover:bg-violet-100 focus:outline-none focus:shadow-outline"
          >
            <span className="mr-2">Cart {cart.id}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </Link>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{cart.userId}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{cart.totalQuantity}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left text-emerald-500 font-medium">{formatNumberToUSD(cart.total)}</div>
      </td>
    </tr>
  )

  return (
    <PageContainer>
      <Head>
        <title>Cart List</title>
      </Head>
      <SideBar />
      <BottomNavBar />
      <ContentContainer>
        <h2 className="text-gray-700 text-2xl font-semibold pl-2 mb-3">Cart</h2>
        <DataTable
          headers={tableHeaders}
          rowsComponent={cartRowComponents}
          countItems={data.carts.length}
        />
        <Pagination pagination={pagination} />
      </ContentContainer>
    </PageContainer>
  )
}
