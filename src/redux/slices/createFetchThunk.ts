import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

export function createFetchThunk<T>(typePrefix: string) {
  return createAsyncThunk<
    { data: T[]; totalCount: number },
    string,
    { rejectValue: string }
  >(typePrefix, async (url, { rejectWithValue }) => {
    try {
      const baseUrl = new URL(url)
      baseUrl.searchParams.delete('page')
      baseUrl.searchParams.delete('limit')

      const totalResponse = await axios.get<T[]>(baseUrl.toString())
      const totalCount = totalResponse.data.length

      const response = await axios.get<T[]>(url)

      if (response.status !== 200) {
        throw new Error('Failed to fetch data with status ' + response.status)
      }
      return { data: response.data, totalCount }
    } catch (error) {
      const axiosError = error as AxiosError
      console.log('Fetch error: ', axiosError.message)
      return rejectWithValue(axiosError.message || 'An unknown error occured')
    }
  })
}
