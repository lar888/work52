import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../redux/store'

/**
 * Reusable data-fetching hook that supports:
 * - Pagination (?page=)
 * - LocalStorage filter persistence
 * - Reset (?clear=1)
 * - Optional reload trigger
 */
export function useFilteredPaginatedData<T>(config: {
  localStorageKey: string
  baseUrl: string
  fetchThunk: any
  selectData: (state: any) => T[]
  selectTotalCount: (state: any) => number
  selectLoading: (state: any) => boolean
  selectError: (state: any) => string | null
  itemsPerPage: number
  resetOnMount?: boolean
  reload?: string | number // ✅ added optional reload dependency
}) {
  const {
    localStorageKey,
    baseUrl,
    fetchThunk,
    selectData,
    selectTotalCount,
    selectLoading,
    selectError,
    itemsPerPage,
    resetOnMount = false,
    reload 
  } = config

  const dispatch = useDispatch<AppDispatch>()
  const [searchParams, setSearchParams] = useSearchParams()

  const data = useSelector(selectData)
  const totalCount = useSelector(selectTotalCount)
  const isLoading = useSelector(selectLoading)
  const error = useSelector(selectError)

  const currentPage = Number(searchParams.get('page') ?? 1)

  const buildApiUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.set('page', String(currentPage))
    params.set('limit', String(itemsPerPage))
    params.set('order', searchParams.get('order') ?? 'asc')

    // Keep any other filters (like sortBy, name, category)
    searchParams.forEach((v, k) => {
      if (!['page', 'limit', 'order'].includes(k)) params.set(k, v)
    })

    return `${baseUrl}?${params.toString()}`
  }, [currentPage, baseUrl, itemsPerPage, searchParams.toString()])

  // Restore filters from localStorage on mount
  useEffect(() => {
    if (resetOnMount) return
    if ([...searchParams.keys()].length > 0) return
    const saved = localStorage.getItem(localStorageKey)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSearchParams(parsed, { replace: true })
      } catch {
        localStorage.removeItem(localStorageKey)
      }
    }
  }, [])

  // 🔹 Main fetch effect — now includes reload
  useEffect(() => {
    if (searchParams.get('clear') === '1') {
      localStorage.removeItem(localStorageKey)
      setSearchParams({}, { replace: true })
      dispatch(fetchThunk(`${baseUrl}?page=1&limit=${itemsPerPage}&order=asc`))
      return
    }

    dispatch(fetchThunk(buildApiUrl))

    // Save filters to localStorage
    const toPersist: Record<string, string> = {}
    searchParams.forEach((v, k) => (toPersist[k] = v))
    localStorage.setItem(localStorageKey, JSON.stringify(toPersist))
  }, [searchParams.toString(), dispatch, fetchThunk, buildApiUrl, reload]) // ✅ added reload

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage))

  const handlePageChange = (page: number) => {
    const params: Record<string, string> = { page: String(page) }
    searchParams.forEach((v, k) => {
      if (k !== 'page') params[k] = v
    })
    setSearchParams(params, { replace: true })
  }

  return {
    data,
    totalCount,
    isLoading,
    error,
    searchParams,
    setSearchParams,
    currentPage,
    totalPages,
    handlePageChange
  }
}
