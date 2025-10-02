import type { PostInterface } from '../../types/Post.interface'
import { API_URL } from '../../utils/mockapiPosts'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDelete } from '../../hooks/useDelete'
import EditPost from './EditPost'

interface PostProps {
  post: PostInterface
  reload?: () => void
  isAdminMode?: boolean
}

const Post = ({
  post: { id, name, description, image, category, tags, year },
  reload,
  isAdminMode = false
}: PostProps) => {
  const { delete: deletePost } = useDelete(API_URL)

  const handleDeletePost = async () => {
    try {
      await deletePost(id.toString())
      reload?.() // call only if provided
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <li className="post-item">
      {image && <img className="post-item__image" src={image} alt={name} />}
      <h2 className="post-item__title">{name}</h2>
      <p className="post-item__description">{description}</p>
      <p className="post-item__category">{category}</p>
      <p className="post-item__year">{year}</p>

      {isAdminMode && (
        <div className="post-item__actions">
          <button className="post-item__delete" onClick={handleDeletePost}>
            <FaTrash />
          </button>
          <EditPost
            post={{ id, name, description, image, category, tags, year }}
            reload={reload ?? (() => {})}
          >
            <FaEdit />
          </EditPost>
        </div>
      )}
    </li>
  )
}

export default Post
