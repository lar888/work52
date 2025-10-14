import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoading
} from '../../redux/slices/postsSlice'
import type { AppDispatch } from '../../redux/store'
import Loading from '../../ui/Loading'
import PostsList from '../posts/PostsList'
import { API_URL } from '../../utils/mockapiPosts'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()

  const posts = useSelector(selectPosts)
  const isLoading = useSelector(selectPostsLoading)
  const error = useSelector(selectPostsError)

  const [selectedPosts, setSelectedPosts] = useState(posts)

  // Fetch all selected posts (ignore pagination)
  useEffect(() => {
    const url = `${API_URL}?selected=true&sortBy=createdAt&order=desc`
    dispatch(fetchAllPosts(url))
  }, [dispatch])

  // Keep in sync with Redux
  useEffect(() => {
    setSelectedPosts(posts.filter((p) => p.selected))
  }, [posts])

  return (
    <div>
      {/* === HERO SECTION === */}
      <section className="hero">
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">
              Biophysics: Modeling Proteins and Macromolecules
            </h1>
            <p className="hero__subtitle">
              Exploring the molecular mechanisms that power life —
              <br />
              from electron transfer to antibiotic resistance and bio-inspired
              catalysis.
            </p>
          </div>
        </div>
      </section>

      {/* === INTRO TEXT === */}
      <section className="home-intro container">
        <h2>Our Research</h2>
        <p className="highlight-text">
          We explore the molecular foundations of life’s energy systems,
          focusing on how proteins control the movement of electrons and
          protons, interact with antibiotics, and drive key biochemical
          reactions. Our research spans from uncovering the mechanisms of charge
          transfer in proteins and dissecting the molecular basis of antibiotic
          action and resistance, to engineering bacterial hydrogenases as robust
          biocatalysts for clean energy applications. At the core of these
          efforts is a broader quest to understand how living cells convert and
          manage energy, revealing the fundamental principles that sustain
          biological function and inspire innovative solutions in medicine and
          renewable energy.
        </p>
      </section>

      {/* === POSTS SECTION === */}
      <section className="home-posts">
        <h2>Selected Publications</h2>
        {isLoading && <Loading />}
        {error && <h2 className="error">{error}</h2>}
        {!isLoading && !error && (
          <PostsList posts={selectedPosts} isAdminMode={false} />
        )}
      </section>
    </div>
  )
}

export default Home
