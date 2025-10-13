import axios from 'axios'
import type { PostInterface } from '../types/Post.interface'

export const useAdd = (url: string) => {
  const add = async (data: Partial<PostInterface>) => {
    try {
      const response = await axios.post<PostInterface>(url, {
				...data,
				selected: data.selected ?? false,
			})
      return response.data
    } catch (error) {
      console.error(`Error adding post: ${(error as Error).message}`)
      throw new Error(`Failed to add post`)
    }
  }

  return { add }
}
