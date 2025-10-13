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
  post: { id, name, description, image, category, tags, year, selected },
  reload,
  isAdminMode = false,
}: PostProps) => {
  const { deletePost } = useDelete(API_URL)

  const handleDeletePost = async () => {
    try {
      await deletePost(id)
      reload?.()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <li className="post-item">
      {image && <img className="post-item__image" src={image} alt={name} />}

      <div className="post-item__content">
        <h2 className="post-item__title">
          {isAdminMode ? `#${id} — ${name}` : name}
        </h2>

        <p className="post-item__description">{description}</p>

        <div className="post-item__meta">
          <span className="post-item__category">{category}</span>
          <span className="post-item__dot">•</span>
          <span className="post-item__year">{year}</span>
        </div>

        {isAdminMode && (
          <div className="post-item__actions">
            <button className="post-item__delete" onClick={handleDeletePost}>
              <FaTrash />
            </button>
            <EditPost
              post={{
                id,
                name,
                description,
                image,
                category,
                tags,
                year,
                selected
              }}
              reload={reload ?? (() => {})}
            >
              <FaEdit />
            </EditPost>
          </div>
        )}
      </div>
    </li>
  )
}

export default Post
