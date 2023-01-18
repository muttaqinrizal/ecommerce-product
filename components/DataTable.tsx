import { ReactNode } from "react"

export interface TableHeader {
  title: string
}

type Props = {
  headers: TableHeader[]
  rowsComponent: ReactNode
  countItems: number
}

export default function DataTable({ headers, rowsComponent, countItems }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-slate-800 bg-gray-5 ">
          <tr>
            {headers.map(header =>
              <th key={header.title} className="p-2 whitespace-nowrap ">
                <div className="font-semibold text-left ">{header.title}</div>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-slate-900">
          {rowsComponent}
          {countItems === 0
            ? <tr>
              <td
                colSpan={headers.length}
                className="p-2 whitespace-normal"
              >
                <p className="text-gray-400 text-center">No records found</p>
              </td>
            </tr>
            : null
          }
        </tbody>
      </table>
    </div>
  )
}
