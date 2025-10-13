import axios from 'axios'
import type { PostInterface } from '../types/Post.interface'

export const useUpdate = (url: string) => {
  const update = async (data: Partial<PostInterface>) => {
    if (!data.id) {
      throw new Error('Post ID is required to update')
    }
    try {
      const response = await axios.put<PostInterface>(`${url}/${data.id}`, {
        ...data,
        selected: data.selected ?? false
      })
      return response.data
    } catch (error) {
      console.error(`Error updating post: ${(error as Error).message}`)
      throw new Error(`Failed to update post`)
    }
  }

  return { update }
}
