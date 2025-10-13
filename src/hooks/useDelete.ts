// src/hooks/useDelete.ts
import axios from 'axios'

export const useDelete = (url: string) => {
  const deletePost = async (id: string) => {
    try {
      const response = await axios.delete(`${url}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting post: ${(error as Error).message}`)
      throw new Error('Failed to delete post')
    }
  }

  return { deletePost }
}
