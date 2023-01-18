import Link from "next/link"

type Props = {
  title: string
  href: string
  disabled: boolean
}

export default function ButtonLink({ title, href, disabled }: Props) {
  if (disabled) {
    return (
      <button
        className="border border-gray-200 bg-gray-100 text-gray-400 rounded-md px-4 py-2 m-2"
        disabled
      >
        {title}
      </button>
    )
  }

  return (
    <Link
      href={href}
      className="border border-gray-200 bg-gray-400 text-white rounded-md px-4 py-2 m-2 transition ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
    >
      {title}
    </Link>
  )
}
