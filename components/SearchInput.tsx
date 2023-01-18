import { useRouter } from "next/router"
import { DebounceInput } from "react-debounce-input"
import { handleChangeFilter } from "@/lib/filter"

type Props = {
  query: string
}

export default function SearchInput({ query }: Props) {
  const router = useRouter()
  const queryValue = router.query[query] as string | undefined

  return (
    <div>
      <label className="mb-1 inline-block font-semibold text-xs text-gray-800">Search</label>
      <DebounceInput
        onChange={(e) =>
          handleChangeFilter({
            router,
            queryKey: query,
            queryValue: e.target.value,
            toggleQuery: e.target.value !== "" ? "ADD" : "REMOVE"
          })}
        debounceTimeout={500}
        className={`
          w-full p-2 h-9 block border border-gray-300 transition-all rounded text-xs 
          hover:border-gray-400 focus:border-violet-800 focus:outline-1 focus:outline-violet-800
        `}
        placeholder="Search Product Name..."
        value={queryValue}
      />
    </div>
  )
}
