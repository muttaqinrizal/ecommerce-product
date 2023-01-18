import ButtonLink from "./ButtonLink"
import { Pagination as PaginationType } from "@/lib/pagination"

type Props = {
  pagination: PaginationType
}

export default function Pagination({ pagination }: Props) {
  return (
    <div className="mt-4 px-2 flex flex-col items-center justify-center md:flex-row md:justify-between">
      <div>
        <p className="text-sm text-gray-400">Showing {pagination.startIndex} to {pagination.endIndex} of {pagination.totalItems} entries</p>
      </div>
      <div className="flex flex-row items-center">
        <ButtonLink
          title="Prev"
          href={pagination.previousUrl}
          disabled={pagination.previousUrl === ""}
        />
        <p>Page {pagination.currentPage} / {pagination.totalPage}</p>
        <ButtonLink
          title="Next"
          href={pagination.nextUrl}
          disabled={pagination.nextUrl === ""}
        />
      </div>
    </div>
  )
}
