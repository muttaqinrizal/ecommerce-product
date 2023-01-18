import BottomNavLink from "./BottomNavLink"
import { navigationList } from "@/lib/navigation"

export default function BottomNavBar() {
  return (
    <aside className="w-full shadow fixed bottom-0 block md:hidden">
      <nav className="bg-gray-50 bg-slate-100 h-full">
        <ul className="flex flex-row">
          {navigationList.map(navigationItem =>
            <li key={navigationItem.href} className="flex-1">
              <BottomNavLink href={navigationItem.href} title={navigationItem.title} />
            </li>
          )}
        </ul>
      </nav>
    </aside>
  )
}
