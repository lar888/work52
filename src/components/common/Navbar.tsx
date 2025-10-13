// src/components/common/Navbar.tsx
import { useState } from 'react'
import { NavLink } from 'react-router'
import { navigationRoutes } from '../../router'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectIsLoggedIn } from '../../redux/slices/authSlice'
import AdminLoginModal from '../modals/AdminLoginModal'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(logout())
  }

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === '12345') {
      dispatch(login())
      setIsModalOpen(false)
    } else {
      alert('Invalid username or password.')
    }
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo or site name */}
        <NavLink to="/" className="navbar__brand" onClick={closeMenu}>
          MySite
        </NavLink>

        {/* Burger button (visible only on mobile) */}
        <button
          className="navbar__toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <FaTimes className="navbar__icon navbar__icon--close" />
          ) : (
            <FaBars className="navbar__icon" />
          )}
        </button>

        {/* Nav links */}
        <ul className={`navbar__list ${menuOpen ? 'open' : ''}`}>
          {navigationRoutes.map((route) => (
            <li key={route.id} className="navbar__item">
              <NavLink
                to={route.path}
                className="navbar__link"
                onClick={closeMenu}
              >
                {route.label}
              </NavLink>
            </li>
          ))}

          {isLoggedIn && (
            <li className="navbar__item">
              <NavLink to="/admin" className="navbar__link" onClick={closeMenu}>
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
                  handleLogout(e)
                  closeMenu()
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
                  handleLoginClick(e)
                  closeMenu()
                }}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <AdminLoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
      />

      {menuOpen && (
        <div
          className={`navbar__overlay ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  )
}

export default Navbar
