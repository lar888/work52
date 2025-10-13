import Sidebar from '../common/Sidebar'
import type { CATEGORY, TAGS, YEARS } from '../../data/mockDataPosts'

interface PageLayoutProps {
  title: string
  categories: typeof CATEGORY
  years: typeof YEARS
  tags: typeof TAGS
  children: React.ReactNode
  onFilter?: (filters: {
    category?: string
    year?: number
    tags?: string
    name?: string
  }) => void
}

const PageLayout = ({
  title,
  categories,
  years,
  tags,
  onFilter = () => {},
  children
}: PageLayoutProps) => (
  <div className="page-layout">
    <Sidebar
      categories={categories}
      years={years}
      tags={tags}
      onFilter={onFilter}
    />
    <main className="main-content">
      <h1>{title}</h1>
      {children}
    </main>
  </div>
)

export default PageLayout
