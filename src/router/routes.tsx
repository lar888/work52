import type { ReactElement } from 'react'
import Home from '../components/pages/Home'
import Posts from '../components/pages/Posts'
import Users from '../components/pages/Users'
import Research from '../components/pages/Research'
import News from '../components/pages/News'
import Funding from '../components/pages/Funding'
import Contact from '../components/pages/Contact'
import Admin from '../components/pages/Admin'
import RequireAuth from './RequireAuth'

export interface RouteConfig {
  id: string
  path: string
  element: ReactElement
  label?: string
  showInNavigation?: boolean
}

export const routesConfig: RouteConfig[] = [
  {
    id: 'home',
    path: '/',
    element: <Home />,
    label: 'Home',
    showInNavigation: true
  },
  {
    id: 'posts',
    path: '/posts',
    element: <Posts />,
    label: 'Publications',
    showInNavigation: true
  },
  {
    id: 'users',
    path: '/users',
    element: <Users />,
    label: 'The Team',
    showInNavigation: true
  },
  {
    id: 'research',
    path: '/research',
    element: <Research />,
    label: 'Research',
    showInNavigation: true
  },
  {
    id: 'news',
    path: '/news',
    element: <News />,
    label: 'News',
    showInNavigation: true
  },
  {
    id: 'funding',
    path: '/funding',
    element: <Funding />,
    label: 'Funding',
    showInNavigation: true
  },
  {
    id: 'contact',
    path: '/contact',
    element: <Contact />,
    label: 'Contact',
    showInNavigation: true
  },
  // ADMIN (protected) — not shown in public navigation
  {
    id: 'admin',
    path: '/admin',
    element: (
      <RequireAuth>
        <Admin />
      </RequireAuth>
    ),
    label: 'Admin',
    showInNavigation: false
  }
]

export const navigationRoutes = routesConfig.filter(
  (route) => route.showInNavigation
)
