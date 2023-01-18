import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function PageContainer({ children }: Props) {
  return (
    <div className="h-screen">
      {children}
    </div>
  )
}
