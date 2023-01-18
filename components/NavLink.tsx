import Link from "next/link"
import { useRouter } from "next/router"

type Props = {
  title: string
  href: string
}

export default function NavLink({ title, href }: Props) {
  const router = useRouter()
  const currentRoute = router.route
  const isActive = href === currentRoute
  let className = `
    flex items-center p-2 text-base font-medium border-l-4 transition-all 
    hover:text-violet-800 hover:border-violet-800 hover:bg-violet-100`
  
  if (isActive) {
    className = className + " text-violet-800 border-violet-800"
  } else {
    className = className + " text-neutral-800 border-transparent"
  }

  return (
    <Link 
      className={className}
      href={href}>
      {title}
    </Link>
  )
}
