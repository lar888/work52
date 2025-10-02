import axios from 'axios'
import type { PostInterface } from '../types/Post.interface'

export const useUpdate = (url: string) => {
  const update = async (data: Partial<PostInterface>) => {
    try {
      const response = await axios.put(`${url}/${data.id}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating post: ${(error as Error).message}`)
      throw new Error(`Failed to add post`)
    }
  }

  return { update }
}
