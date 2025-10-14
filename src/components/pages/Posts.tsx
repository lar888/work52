import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useFilteredPaginatedData } from '../../hooks/useFilteredPaginatedData'
import {
  fetchAllPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoading,
  selectPostsTotalCount
} from '../../redux/slices/postsSlice'
import { API_URL, API_ITEMS_PER_PAGE_LIMIT } from '../../utils/mockapiPosts'
import PageLayout from '../layouts/PageLayout'
import Pagination from '../posts/Pagination'
import PostsList from '../posts/PostsList'
import Loading from '../../ui/Loading'
import { CATEGORY, TAGS, YEARS } from '../../data/mockDataPosts'
import { handleSidebarFilter } from '../../utils/SidebarFilter'

const LOCAL_STORAGE_KEY = 'posts_filters'

const Posts = () => {
  const navigate = useNavigate()

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
    itemsPerPage: API_ITEMS_PER_PAGE_LIMIT
  })

  const handleFilter = useCallback(
    (filters: {
      name?: string
      category?: string
      year?: string | number
      tags?: string
    }) => {
      handleSidebarFilter(navigate, filters, '/posts')
    },
    [navigate]
  )

  return (
    <PageLayout
      title="Publications"
      categories={CATEGORY}
      years={YEARS}
      tags={TAGS}
      onFilter={handleFilter}
    >
      {isLoading && <Loading />}
      {error && <h2 className="error">{error}</h2>}

      {!isLoading && !error && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          <PostsList posts={posts} isAdminMode={false} />
        </>
      )}
    </PageLayout>
  )
}

export default Posts
