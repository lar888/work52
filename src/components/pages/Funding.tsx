import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import PageLayout from '../layouts/PageLayout'
import { CATEGORY, YEARS, TAGS } from '../../data/mockDataPosts'
import { handleSidebarFilter } from '../../utils/SidebarFilter'

const Funding = () => {
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

  // ✅ Local images stored in /public
  const fundingSources = [
    {
      id: 1,
      name: 'National Science Foundation (NSF)',
      logo: '/NSF_logo.png',
      url: 'https://www.nsf.gov/'
    },
    {
      id: 2,
      name: 'European Research Council (ERC)',
      logo: '/ERC_logo.png',
      url: 'https://erc.europa.eu/'
    },
    {
      id: 3,
      name: 'European Commission',
      logo: '/logo-ec--en.svg',
      url: 'https://ec.europa.eu/'
    },
    {
      id: 4,
      name: 'National Institutes of Health (NIH)',
      logo: '/nih_logo.png',
      url: 'https://www.nih.gov/'
    }
  ]

  return (
    <PageLayout
      title="Funding"
      categories={CATEGORY}
      years={YEARS}
      tags={TAGS}
      onFilter={handleFilter}
    >
      <div className="funding-section">
        <p className="funding-intro">
          <strong>
            Our research is made possible through generous support
          </strong>{' '}
          from national and international funding agencies. We gratefully
          acknowledge the following institutions for their{' '}
          <em>continued investment in biophysical research.</em>
        </p>

        <div className="funding-logos">
          {fundingSources.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="funding-logo"
            >
              <img src={source.logo} alt={source.name} />
              <p>{source.name}</p>
            </a>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export default Funding
