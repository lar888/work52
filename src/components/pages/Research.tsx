import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import PageLayout from '../layouts/PageLayout'
import { CATEGORY, YEARS, TAGS } from '../../data/mockDataPosts'
import { handleSidebarFilter } from '../../utils/SidebarFilter'
import researchData from '../../data/db_research.json'

const Research = () => {
  const navigate = useNavigate()

  const handleFilter = useCallback(
    (filters: {
      category?: string
      year?: number
      tags?: string
      name?: string
    }) => {
      handleSidebarFilter(navigate, filters)
    },
    [navigate]
  )

  return (
    <PageLayout
      title="Research"
      categories={CATEGORY}
      years={YEARS}
      tags={TAGS}
      onFilter={handleFilter}
    >
      <section className="research-container">
        {researchData.map((topic, index) => (
          <div
            key={topic.id}
            className={`research-card ${
              index % 2 === 1 ? 'research-card--reverse' : ''
            }`}
          >
            <img
              src={topic.image}
              alt={topic.title}
              className="research-card__image"
            />
            <div className="research-card__content">
              <h2 className="research-card__title">{topic.title}</h2>
              <p className="research-card__description">{topic.description}</p>
            </div>
          </div>
        ))}
      </section>
    </PageLayout>
  )
}

export default Research
