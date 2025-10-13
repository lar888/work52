import { useState, type FormEvent } from 'react'
import type { PostInterface } from '../../types/Post.interface'
import { POST_CATEGORIES } from '../../data/mockDataPosts'
import InputField from './inputField'
import SelectField from './SelectField'

interface PostFormProps {
  onSubmit: (post: Partial<PostInterface>) => void
  post: Partial<PostInterface>
}

const PostForm = ({ onSubmit, post }: PostFormProps) => {
  const [name, setName] = useState(post.name ?? '')
  const [description, setDescription] = useState(post.description ?? '')
  const [category, setCategory] = useState(post.category ?? '')
  const [image, setImage] = useState(post.image ?? '')
  const [year, setYear] = useState(post.year ?? new Date().getFullYear())
  const [tags, setTags] = useState(post.tags?.join(', ') ?? '')
  const [selected, setSelected] = useState(post.selected ?? false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const returnPost: Partial<PostInterface> = {
      name,
      description,
      category,
      image,
      year,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      selected
    }

    if (post.id) {
      returnPost.id = post.id
    }

    onSubmit(returnPost)

    if (!post.id) {
      setName('')
      setDescription('')
      setCategory('')
      setImage('')
      setYear(new Date().getFullYear())
      setTags('')
      setSelected(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="name"
        value={name}
        label="Name"
        placeholder="Post name..."
        required
        onChangeInput={(e) => setName(e.target.value)}
      />

      <InputField
        id="description"
        value={description}
        label="Description"
        placeholder="Post description..."
        textarea
        onChangeTextArea={(e) => setDescription(e.target.value)}
      />

      <InputField
        id="image"
        value={image}
        label="Image"
        placeholder="Image URL..."
        onChangeInput={(e) => setImage(e.target.value)}
      />

      <SelectField
        id="category"
        value={category}
        label="Category"
        options={POST_CATEGORIES}
        onChangeSelect={(e) => setCategory(e.target.value)}
      />

      <InputField
        id="year"
        value={String(year)}
        label="Year"
        placeholder="Post year..."
        type="number"
        onChangeInput={(e) => setYear(+e.target.value)}
      />

      <InputField
        id="tags"
        value={tags}
        label="Tags (comma separated)"
        placeholder="tag1, tag2, tag3"
        onChangeInput={(e) => setTags(e.target.value)}
      />

      <div className="form-group checkbox-group">
        <label className="form-label">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => setSelected(e.target.checked)}
          />
          &nbsp; Mark as Selected
        </label>
      </div>

      <div className="form-group">
        <button className="form-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}

export default PostForm
