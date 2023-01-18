import NavLink from "./NavLink"
import { navigationList } from "@/lib/navigation"

export default function SideBar() {
  return (
    <aside className="w-64 fixed top-0 left-0 h-full shadow-md hidden md:block">
      <nav className="px-3 py-4 overflow-y-auto bg-gray-200 h-full">
        <p className="text-center text-3xl font-semibold my-4">DASHBOARD</p>
        <ul className="space-y-2">
          {navigationList.map(navigationItem =>
            <li key={navigationItem.href}>
              <NavLink href={navigationItem.href} title={navigationItem.title} />
            </li>
          )}
        </ul>
      </nav>
    </aside>
  )
}
