import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import {
  fetchAllUsers,
  selectUsers,
  selectUsersError,
  selectUsersLoading
} from '../../redux/slices/userSlice'

const Users = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUsers)
  const isLoading = useSelector(selectUsersLoading)
  const error = useSelector(selectUsersError)

  useEffect(() => {
    dispatch(fetchAllUsers('https://68a8811fb00e02cbca668a1e.mockapi.io/users'))
  }, [dispatch])

  return (
    <div>
      <h1>The Team</h1>
      {isLoading && <h2 className="loading">Loading...</h2>}
      {error && <h2 className="error">{error}</h2>}
      {!isLoading && !error && (
        <div className="users-container">
          {users.length > 0 &&
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
            ))}
        </div>
      )}
    </div>
  )
}

export default Users
