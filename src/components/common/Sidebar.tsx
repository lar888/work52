import { useState, useEffect } from 'react'
import { debounce } from '../../utils/debounce'
import { useSearchParams } from 'react-router'

interface SidebarProps {
  categories: string[]
  years: number[]
  tags: string[]
  onFilter: (filters: {
    category?: string
    year?: number
    tags?: string
    name?: string
  }) => void
}

const Sidebar = ({ categories, years, tags, onFilter }: SidebarProps) => {
  const [search, setSearch] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategory = searchParams.get('category') ?? ''
  const activeYear = searchParams.get('year') ?? ''
  const activeTag = searchParams.get('tags') ?? ''

  const debouncedSearch = debounce((value: string) => {
    onFilter({ name: value })
  }, 400)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    debouncedSearch(value)
  }

  const handleResetAll = () => {
    setSearch('')
    setSearchParams({}, { replace: true })
    onFilter({})
  }

  // Keep input synced with query param
  useEffect(() => {
    const name = searchParams.get('name') ?? ''
    if (name !== search) setSearch(name)
  }, [searchParams])

  const uniqueCategories = [...new Set(categories)].sort()
  const uniqueYears = [...new Set(years)].sort((a, b) => b - a)
  const uniqueTags = [...new Set(tags)].sort()

  return (
    <aside className="sidebar">
      {/* === Search === */}
      <div className="sidebar__section">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          className="sidebar__search-input"
        />
      </div>

      {/* === Categories === */}
      <div className="sidebar__section sidebar__section--categories">
        <h3 className="sidebar__title">Categories</h3>
        <ul className="sidebar__list">
          <li
            key="all"
            className="sidebar__item sidebar__item--all"
            onClick={handleResetAll}
          >
            All
          </li>
          {uniqueCategories.map((cat) => (
            <li
              key={cat}
              className={`sidebar__item ${
                activeCategory === cat ? 'sidebar__item--active' : ''
              }`}
              onClick={() => onFilter({ category: cat })}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar__divider" />

      {/* === Years === */}
      <div className="sidebar__section sidebar__section--years">
        <h3 className="sidebar__title">Years</h3>
        <ul className="sidebar__list sidebar__list--inline">
          {uniqueYears.map((yr) => (
            <li
              key={yr}
              className={`sidebar__item ${
                activeYear === String(yr) ? 'sidebar__item--active' : ''
              }`}
              onClick={() => onFilter({ year: yr })}
            >
              {yr}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar__divider" />

      {/* === Tags === */}
      <div className="sidebar__section sidebar__section--tags">
        <h3 className="sidebar__title">Tags</h3>
        <ul className="sidebar__list sidebar__list--inline">
          {uniqueTags.map((tag) => (
            <li
              key={tag}
              className={`sidebar__item ${
                activeTag === tag ? 'sidebar__item--active' : ''
              }`}
              onClick={() => onFilter({ tags: tag })}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
