import { useEffect, useRef, useState } from 'react'
import { API_ITEMS_PER_PAGE_LIMIT, createUrl } from '../../utils/mockapiPosts'
import { debounce } from '../../utils/debounce'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoading,
  selectPostsTotalCount
} from '../../redux/slices/postsSlice'
import type { AppDispatch } from '../../redux/store'
import Loading from '../../ui/Loading'
import Pagination from '../posts/Pagination'
import PostsFilter from '../posts/PostsFilter'
import PostsList from '../posts/PostsList'
import { useSearchParams } from 'react-router'

const LOCAL_STORAGE_KEY = 'posts_filters'

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  const posts = useSelector(selectPosts)
  const totalPosts = useSelector(selectPostsTotalCount)
  const isLoading = useSelector(selectPostsLoading)
  const error = useSelector(selectPostsError)

  // restore filters from URL/localStorage
  const persisted = (() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })()

  const pageFromUrl = Number(searchParams.get('page') ?? persisted.page ?? 1)
  const nameFromUrl = searchParams.get('name') ?? persisted.name ?? ''
  const sortFromUrl = searchParams.get('sortBy') ?? persisted.sort ?? ''
  const orderFromUrl = searchParams.get('order') ?? persisted.order ?? 'asc'

  const [page, setPage] = useState<number>(pageFromUrl)
  const [name, setName] = useState<string>(nameFromUrl)
  const [sort, setSort] = useState<string>(sortFromUrl)
  const [order, setOrder] = useState<string>(orderFromUrl)

  const totalPages = Math.max(
    1,
    Math.ceil(totalPosts / API_ITEMS_PER_PAGE_LIMIT)
  )

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = name
  }, [name])

  useEffect(() => {
    const params: Record<string, string> = {}
    if (page && page !== 1) params.page = String(page)
    if (name) params.name = name
    if (sort) params.sortBy = sort
    if (order && order !== 'asc') params.order = order
    setSearchParams(params, { replace: true })

    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ page, name, sort, order })
      )
    } catch {
      // ignore
    }
  }, [page, name, sort, order, setSearchParams])

  useEffect(() => {
    const url = createUrl(page, name, sort, order)
    dispatch(fetchAllPosts(url))
  }, [dispatch, page, name, sort, order])

  const debouncedSetName = debounce((value: string) => {
    setPage(1)
    setName(value)
  }, 400)

  const resetFilters = () => {
    setName('')
    setSort('')
    setOrder('asc')
    setPage(1)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <h1>Posts</h1>

      <PostsFilter
        inputRef={inputRef}
        sort={sort}
        order={order}
        debouncedSetName={debouncedSetName}
        setSort={(v) => {
          setSort(v)
          setPage(1)
        }}
        setOrder={(v) => {
          setOrder(v)
          setPage(1)
        }}
        resetFilters={resetFilters}
      />

      {isLoading && <Loading />}
      {error && <h2 className="error">{error}</h2>}
      {!isLoading && !error && (
        <div className="content">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              setPage(p)
              setSearchParams((prev) => {
                const next = new URLSearchParams(prev.toString())
                next.set('page', String(p))
                return next
              })
            }}
          />

          <PostsList posts={posts} isAdminMode={false} />
        </div>
      )}
    </div>
  )
}

export default Posts
