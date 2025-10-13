import { useCallback, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useSelector } from 'react-redux'
import {
  fetchAllPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoading,
  selectPostsTotalCount
} from '../../redux/slices/postsSlice'
import { selectIsLoggedIn } from '../../redux/slices/authSlice'
import { API_URL, API_ITEMS_PER_PAGE_LIMIT } from '../../utils/mockapiPosts'
import { useFilteredPaginatedData } from '../../hooks/useFilteredPaginatedData'
import AddPost from '../posts/AddPost'
import Pagination from '../posts/Pagination'
import PostsFilter from '../posts/PostsFilter'
import PostsList from '../posts/PostsList'
import Loading from '../../ui/Loading'
import { debounce } from '../../utils/debounce'

const LOCAL_STORAGE_KEY = 'posts_filters'

const Admin = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const [reload, setReload] = useState('0')
  const [searchParams, setSearchParams] = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  // ✅ Use shared hook for fetching paginated + filtered posts
  const {
    data: posts,
    isLoading,
    error,
    totalPages,
    currentPage,
    handlePageChange
  } = useFilteredPaginatedData({
    baseUrl: API_URL,
    localStorageKey: LOCAL_STORAGE_KEY,
    fetchThunk: fetchAllPosts,
    selectData: selectPosts,
    selectTotalCount: selectPostsTotalCount,
    selectLoading: selectPostsLoading,
    selectError: selectPostsError,
    itemsPerPage: API_ITEMS_PER_PAGE_LIMIT,
    resetOnMount: true,
		reload
  })

  const sort = searchParams.get('sortBy') ?? ''
  const order = searchParams.get('order') ?? 'asc'

  // 🔹 Debounced search
  const debouncedSetName = debounce((value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString())
      if (value) next.set('name', value)
      else next.delete('name')
      next.set('page', '1')
      return next
    })
  }, 400)

  const setSort = (v: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString())
      if (v) next.set('sortBy', v)
      else next.delete('sortBy')
      next.set('page', '1')
      return next
    })
  }

  const setOrder = (v: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString())
      next.set('order', v)
      next.set('page', '1')
      return next
    })
  }

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true })
    if (inputRef.current) inputRef.current.value = ''
  }, [setSearchParams])

  return (
    <div className='admin'>
      <h1>Admin Panel</h1>

      <PostsFilter
        inputRef={inputRef}
        sort={sort}
        order={order}
        debouncedSetName={debouncedSetName}
        setSort={setSort}
        setOrder={setOrder}
        resetFilters={resetFilters}
      />

      {isLoading && <Loading />}
      {error && <h2 className="error">{error}</h2>}

      {!isLoading && !error && (
        <div className="content">
          {isLoggedIn && (
            <div className="buttons-group">
              <AddPost setReload={setReload} />
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          <PostsList posts={posts} setReload={setReload} isAdminMode={true} />
        </div>
      )}
    </div>
  )
}

export default Admin
