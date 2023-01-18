import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function ContentContainer({ children }: Props) {
  return (
    <main className="flex-auto p-4 pb-14 md:pb-4 md:ml-64">
      {children}
    </main>
  )
}
