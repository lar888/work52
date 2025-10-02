import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface AuthStateInterface {
  isLoggedIn: boolean
}

// read persisted auth flag (simple boolean)
const persisted =
  typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null
const initialIsLoggedIn = persisted === 'true'

const initialState: AuthStateInterface = {
  isLoggedIn: initialIsLoggedIn
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
      try {
        localStorage.setItem('isLoggedIn', 'true')
      } catch {
        /* ignore */
      }
    },
    logout: (state) => {
      state.isLoggedIn = false
      try {
        localStorage.setItem('isLoggedIn', 'false')
      } catch {
        /* ignore */
      }
    }
  }
})

export const { login, logout } = authSlice.actions
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export default authSlice.reducer
