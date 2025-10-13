import { useState, type ReactNode } from 'react'
import type { PostInterface } from '../../types/Post.interface'
import { useUpdate } from '../../hooks/useUpdate'
import { API_URL } from '../../utils/mockapiPosts'
import Modal from '../modals/Modal'
import PostForm from '../form/PostForm'

interface EditPostProps {
  children: ReactNode
  post: PostInterface
  reload: () => void
}

const EditPost = ({ children, post, reload }: EditPostProps) => {
  const [showModal, setShowModal] = useState(false)
  const { update } = useUpdate(API_URL)

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleSubmit = async (post: Partial<PostInterface>) => {
    try {
      const updatedPost = await update(post)
      console.log('Updated:', updatedPost)
			
      handleClose()
      reload()
    } catch (error) {
      console.error('Update failed:', error)
    }
  }

  return (
    <>
      <button className="post-item__edit" onClick={handleOpen}>
        {children}
      </button>
      {showModal && (
        <Modal onClose={handleClose}>
          <h2 className="modal__title">
            Edit Post #{post.id}, {post.name}
          </h2>
          <PostForm onSubmit={handleSubmit} post={post} />
        </Modal>
      )}
    </>
  )
}

export default EditPost
