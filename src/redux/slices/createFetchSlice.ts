import { createSlice, type Draft } from '@reduxjs/toolkit'
import { createFetchThunk } from './createFetchThunk'

interface FetchState<T> {
  data: T[]
  totalCount: number
  error: string | null
  isLoading: boolean
}

const createFetchSlice = <T>(name: string, initialState: FetchState<T>) => {
  const fetchThunk = createFetchThunk<T>(`${name}/fetchAll`)

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      builder.addCase(fetchThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload.data as Draft<T[]>
        state.totalCount = action.payload.totalCount
      })
      builder.addCase(fetchThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'An unknown error occurred'
      })
    }
  })
  return {
    ...slice,
    fetchThunk
  }
}
export default createFetchSlice
