import { useState } from 'react'
import Modal from '../modals/Modal'
import PostForm from '../form/PostForm'
import type { PostInterface } from '../../types/Post.interface'
import { API_URL } from '../../utils/mockapiPosts'
import { useAdd } from '../../hooks/useAdd'
import { INITIAL_POST } from '../../data/mockDataPosts'

interface AddPostProps {
  setReload: React.Dispatch<React.SetStateAction<string>>
}

const AddPost = ({ setReload }: AddPostProps) => {
  const [showModal, setShowModal] = useState(false)
  const { add } = useAdd(API_URL)

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleSubmit = async (post: Partial<PostInterface>) => {
    try {
      const newPost = await add(post)
      console.log('Added post:', newPost)

      // 🔄 trigger reload in Admin
      setReload(Date.now().toString())

      handleClose()
    } catch (error) {
      console.error('Failed to add post:', error)
    }
  }

  return (
    <>
      <button className="add-post-btn" onClick={handleOpen}>
        Add Post
      </button>
      {showModal && (
        <Modal onClose={handleClose}>
          <h2 className="modal__title">Add Post</h2>
          <PostForm onSubmit={handleSubmit} post={INITIAL_POST} />
        </Modal>
      )}
    </>
  )
}

export default AddPost
