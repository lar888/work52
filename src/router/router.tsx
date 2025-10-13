import { createBrowserRouter } from 'react-router'
import { routesConfig } from './routes'
import Layout from '../components/common/Layout.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: routesConfig
  }
])
