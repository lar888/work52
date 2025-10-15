import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import PageLayout from '../layouts/PageLayout'
import { CATEGORY, TAGS, YEARS } from '../../data/mockDataPosts'
import { handleSidebarFilter } from '../../utils/SidebarFilter'
import InputField from '../form/inputField'

const Contact = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [success, setSuccess] = useState(false)

  const handleFilter = useCallback(
    (filters: {
      category?: string
      year?: number
      tags?: string
      name?: string
    }) => {
      handleSidebarFilter(navigate, filters, '/posts')
    },
    [navigate]
  )

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' }
    let valid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.'
      valid = false
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
      valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.'
      valid = false
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty.'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSuccess(false)

    if (!validateForm()) return

    // Simulate successful submission
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setSuccess(true)

      // Hide message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    }, 300)
  }

  return (
    <PageLayout
      title="Contact"
      categories={CATEGORY}
      years={YEARS}
      tags={TAGS}
      onFilter={handleFilter}
    >
      <div className="contact-container">
        <img
          src="/helsinki_logo.png"
          alt="University of Helsinki Logo"
          className="helsinki-logo"
        />

        <p className="contact-intro">
          We are part of the <strong>University of Helsinki</strong>. Feel free
          to contact us regarding our ongoing research, collaboration
          opportunities, or student positions.
        </p>

        <div className="contact-details">
          <h2>Address</h2>
          <p>
            <strong>University of Helsinki</strong> <br />
            Faculty of Biological and Environmental Sciences <br />
            Viikki Biocenter 1 (Biocenter 1, room D306b) <br />
            P.O. Box 56 (Viikinkaari 9) <br />
            00014 Helsinki, Finland
          </p>

          <h2>Email</h2>
          <p>
            <a href="mailto:firstname.lastname@helsinki.fi">
              firstname.lastname@helsinki.fi
            </a>
          </p>

          <h2>Phone</h2>
          <p>+358 (0)9 191 0000</p>
        </div>

        <p className="contact-note">
          For specific research inquiries, please contact the lab directly.
        </p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h2 className="form-title">Send us a message</h2>

          <InputField
            id="name"
            label="Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeInput={handleChange}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <InputField
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email address"
            value={formData.email}
            onChangeInput={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <InputField
            id="message"
            label="Message"
            placeholder="Write your message..."
            value={formData.message}
            textarea
            onChangeTextArea={handleChange}
          />
          {errors.message && <p className="error-text">{errors.message}</p>}

          <button type="submit" className="contact-submit">
            Submit
          </button>

          {success && (
            <p className="success-text">
              Your message has been sent successfully!
            </p>
          )}
        </form>
      </div>
    </PageLayout>
  )
}

export default Contact
