import type { NavigateFunction } from 'react-router'

export const handleSidebarFilter = (
  navigate: NavigateFunction,
  filters: {
    category?: string
    year?: number | string
    tags?: string
    name?: string
  },
  destination: string = '/posts' // 👈 default redirect page
) => {
  const params = new URLSearchParams()

  if (filters.category) params.set('category', filters.category)
  if (filters.year) params.set('year', String(filters.year))
  if (filters.tags) params.set('tags', filters.tags)
  if (filters.name) params.set('name', filters.name)

  const hasFilters = [...params.keys()].length > 0

  navigate(
    hasFilters
      ? { pathname: destination, search: `?${params.toString()}` }
      : { pathname: destination, search: '?clear=1' }
  )
}
