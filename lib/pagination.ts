export type Pagination = {
  currentPage: number
  previousPage: number
  nextPage: number
  totalPage: number
  totalItems: number
  startIndex: number
  endIndex: number
  previousUrl: string
  nextUrl: string
}

export type GetPaginationInput = {
  currentPage: number
  limit: number
  countCurrentPage: number
  countAll: number
  path: string
  queries: any
}

export function getPagination(input: GetPaginationInput) {
  const startIndex = (input.currentPage - 1) * input.limit
  const endIndex = startIndex + input.countCurrentPage

  const pagination: Pagination = {
    currentPage: input.currentPage,
    previousPage: -1,
    nextPage: -1,
    totalPage: input.countAll / input.limit,
    totalItems: input.countAll,
    startIndex: input.countCurrentPage === 0 ? input.countCurrentPage : startIndex + 1,
    endIndex: input.countCurrentPage === 0 ? input.countCurrentPage : endIndex,
    previousUrl: "",
    nextUrl: "",
  }

  const modTotalPage = input.countAll % input.limit

  if (modTotalPage > 0) pagination.totalPage = Math.floor(pagination.totalPage) + 1

  const atFirstPageAndUp = input.currentPage >= 1
  const atSecondPageAndUp = input.currentPage > 1
  const hasRemainingPage = pagination.totalPage - pagination.currentPage >= 1

  if (atSecondPageAndUp) pagination.previousPage = input.currentPage - 1
  if (atFirstPageAndUp && hasRemainingPage) pagination.nextPage = pagination.currentPage + 1

  if (pagination.previousPage > 0) {
    pagination.previousUrl = getPaginationUrl(pagination.previousPage, input.path, input.queries)
  }

  if (pagination.nextPage > 0) {
    pagination.nextUrl = getPaginationUrl(pagination.nextPage, input.path, input.queries)
  }

  return pagination
}

export function getPaginationUrl(destinationPage: number, path: string, queries: any) {
  const params = new URLSearchParams(queries)
  if (params.has("page")) params.delete("page")
  params.append("page", destinationPage.toString())
  return "/" + path + "?" + decodeURIComponent(params.toString())
}
