// src/components/pages/Contact.tsx
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import PageLayout from '../layouts/PageLayout'
import { CATEGORY, TAGS, YEARS } from '../../data/mockDataPosts'
import { handleSidebarFilter } from '../../utils/SidebarFilter'

const Contact = () => {
  const navigate = useNavigate()

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
      </div>
    </PageLayout>
  )
}

export default Contact
