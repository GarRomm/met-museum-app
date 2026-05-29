import { Link, NavLink } from 'react-router-dom'
import { useMuseumStore } from '../store/useMuseumStore'

export default function Navbar() {
  const setSearchQuery = useMuseumStore((s) => s.setSearchQuery)
  const setSelectedDepartmentId = useMuseumStore((s) => s.setSelectedDepartmentId)
  const resetFilters = useMuseumStore((s) => s.resetFilters)

  function handleLogoClick() {
    setSearchQuery('')
    setSelectedDepartmentId(undefined)
    resetFilters()
  }

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" onClick={handleLogoClick} className="text-lg font-semibold tracking-wide text-stone-900">
          Collection du Met
        </Link>
        <ul className="flex gap-6 text-sm list-none m-0 p-0">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-stone-900'
                  : 'text-stone-500 hover:text-stone-800 transition-colors'
              }
            >
              Recherche
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favoris"
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-stone-900'
                  : 'text-stone-500 hover:text-stone-800 transition-colors'
              }
            >
              Favoris
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
