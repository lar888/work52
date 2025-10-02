import Post from './Post'
import type { PostInterface } from '../../types/Post.interface'

interface PostsListProps {
  posts: PostInterface[]
  setReload?: React.Dispatch<React.SetStateAction<string>> // optional now
  isAdminMode?: boolean
}

const PostsList = ({
  posts,
  setReload,
  isAdminMode = false
}: PostsListProps) => (
  <ul className="posts-list">
    {posts.map((post) => (
      <Post
        key={post.id}
        post={post}
        reload={() => setReload?.(String(Date.now()))} // only used in Admin
        isAdminMode={isAdminMode}
      />
    ))}
  </ul>
)

export default PostsList
