import type { UserInterface } from '../../types/User.interface'
import type { RootState } from '../store'
import createFetchSlice from './createFetchSlice'

const initialState = {
  data: [] as UserInterface[],
  totalCount: 0,
  error: null as string | null,
  isLoading: false
}

const userSlice = createFetchSlice<UserInterface>('users', initialState)

export const fetchAllUsers = userSlice.fetchThunk
export const selectUsers = (state: RootState) => state.users.data
export const selectUsersLoading = (state: RootState) => state.users.isLoading
export const selectUsersError = (state: RootState) => state.users.error
export const selectUsersTotalCount = (state: RootState) =>
  state.users.totalCount

export default userSlice.reducer
