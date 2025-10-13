import { useEffect } from 'react'
import Post from './Post'
import type { PostInterface } from '../../types/Post.interface'

interface PostsListProps {
  posts: PostInterface[]
  setReload?: React.Dispatch<React.SetStateAction<string>>
  isAdminMode?: boolean
}

const PostsList = ({
  posts,
  setReload,
  isAdminMode = false
}: PostsListProps) => {
  // optional scroll-top effect on rerender
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [posts])

  return (
    <ul className="posts-list">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          reload={() => setReload?.(String(Date.now()))}
          isAdminMode={isAdminMode}
        />
      ))}
    </ul>
  )
}

export default PostsList
