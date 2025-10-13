import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useFilteredPaginatedData } from '../../hooks/useFilteredPaginatedData'
import {
  fetchAllUsers,
  selectUsers,
  selectUsersError,
  selectUsersLoading,
  selectUsersTotalCount
} from '../../redux/slices/userSlice'
import {
  API_ITEMS_PER_PAGE_LIMIT_USERS, API_URL_USERS
} from '../../utils/mockapiPosts'
import PageLayout from '../layouts/PageLayout'
import Pagination from '../posts/Pagination'
import Loading from '../../ui/Loading'
import { CATEGORY, TAGS, YEARS } from '../../data/mockDataPosts'
import { handleSidebarFilter } from '../../utils/SidebarFilter'

const LOCAL_STORAGE_KEY = 'users_filters'

const Users = () => {
  const navigate = useNavigate()

  const {
    data: users,
    isLoading,
    error,
        totalPages,
    currentPage,
    handlePageChange
  } = useFilteredPaginatedData({
    localStorageKey: LOCAL_STORAGE_KEY,
    baseUrl: API_URL_USERS,
    fetchThunk: fetchAllUsers,
    selectData: selectUsers,
    selectTotalCount: selectUsersTotalCount,
    selectLoading: selectUsersLoading,
    selectError: selectUsersError,
    itemsPerPage: API_ITEMS_PER_PAGE_LIMIT_USERS,
		resetOnMount: true // ✅ start fresh each time you visit /users
  })

  const handleFilter = useCallback(
    (filters: {
      category?: string
      year?: number
      tags?: string
      name?: string
    }) => {
      handleSidebarFilter(navigate, filters, '/posts')
    },
    [navigate]
  )

  return (
    <PageLayout
      title="The Team"
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

          <div className="users-container">
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user.id} className="user-card">
                  <img
                    src={user.image}
                    alt={user.member}
                    className="user-card__image"
                  />
                  <div className="user-card__content">
                    <h2 className="user-card__name">{user.member}</h2>
                    <p className="user-card__description">{user.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="info-text">No users found.</p>
            )}
          </div>
        </>
      )}
    </PageLayout>
  )
}

export default Users