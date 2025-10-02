import { NavLink } from 'react-router'
import { navigationRoutes } from '../../router'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { login, logout } from '../../redux/slices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const handleLogin = () => {
    dispatch(login())
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {navigationRoutes.map((route) => (
          <li key={route.id} className="navbar__item">
            <NavLink to={route.path} className="navbar__link">
              {route.label}
            </NavLink>
          </li>
        ))}

        {/* admin link (only visible to logged-in users) */}
        {isLoggedIn && (
          <li className="navbar__item">
            <NavLink to="/admin" className="navbar__link">
              Admin
            </NavLink>
          </li>
        )}

        {isLoggedIn ? (
          <li className="navbar__item">
            <NavLink
              to="/logout"
              className="navbar__link"
              onClick={(e) => {
                e.preventDefault()
                handleLogout()
              }}
            >
              Logout
            </NavLink>
          </li>
        ) : (
          <li className="navbar__item">
            <NavLink
              to="/login"
              className="navbar__link"
              onClick={(e) => {
                e.preventDefault()
                handleLogin()
              }}
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
