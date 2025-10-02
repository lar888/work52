import type { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../redux/slices/authSlice'
import { Navigate, useLocation } from 'react-router'

interface RequireAuthProps {
  children: ReactElement
}

/**
 * Protects children routes: if not logged in, redirect to home.
 * We keep the attempted location in state so you could extend to login redirect.
 */
const RequireAuth = ({ children }: RequireAuthProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const location = useLocation()

  if (!isLoggedIn) {
    // redirect to home (or to a login page if you add one later)
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
