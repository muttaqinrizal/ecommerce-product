import Select from "react-select"
import { useRouter } from "next/router"
import { Option, handleChangeFilter } from "@/lib/filter"

type Props = {
  label: string
  placeHolder: string
  options: Option[]
  query: string
}

export default function SelectFilter({ label, options, query, placeHolder }: Props) {
  const router = useRouter()
  const queryValue = router.query[query]
  const currentValue = queryValue ? { label: queryValue, value: queryValue } : null

  return (
    <div>
      <label className="mb-1 inline-block font-semibold text-xs text-gray-800">{label}</label>
      <Select
        className="text-xs h-9"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "rgb(237 233 254)",
            primary: "rgb(91 33 182)",
          },
        })}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            cursor: "pointer",
          })
        }}
        options={options}
        isClearable
        onChange={(option) =>
          handleChangeFilter({
            router,
            queryKey: query,
            queryValue: option ? option.value as string : "",
            toggleQuery: option ? "ADD" : "REMOVE"
          })}
        value={currentValue}
        placeholder={placeHolder}
      />
    </div>
  )
}
