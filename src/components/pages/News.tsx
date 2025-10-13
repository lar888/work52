import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import PageLayout from '../layouts/PageLayout'
import { CATEGORY, YEARS, TAGS } from '../../data/mockDataPosts'
import { handleSidebarFilter } from '../../utils/SidebarFilter'
import newsData from '../../data/db_news.json'
import { FaRegCalendarAlt } from 'react-icons/fa'

const News = () => {
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
      title="News"
      categories={CATEGORY}
      years={YEARS}
      tags={TAGS}
      onFilter={handleFilter}
    >
      <div className="news-container">
        {newsData.map((news) => (
          <div key={news.id} className="news-card">
            <img src={news.image} alt="News" className="news-card__image" />
            <div className="news-card__content">
              <p className="news-card__date">
                <FaRegCalendarAlt className="news-card__icon" />
                {new Date(news.date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="news-card__description">{news.description}</p>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}

export default News
