import { useEffect, useRef, useState } from 'react'
import { initPosts, fetchPosts } from '@store/actions'
import { RootState, useAppSelector } from '@store'
import { PostPreview } from './post'
import { Container } from '@components'

export const Posts = () => {
  const { posts } = useAppSelector((state: RootState) => state)
  const filteredPosts = posts.filtered.posts
  const loader = useRef(null)
  const [scrollPosition, getScrollPosition] = useState(0)

  useEffect(() => {
    (posts.page === 0) && initPosts()

    document.documentElement.scrollTop = document.body.scrollTop = posts.scrollPosition

    const handleScroll = () => {
      const position = window.pageYOffset
      getScrollPosition(position)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [posts.page, posts.scrollPosition])

  useEffect(() => {
    const handleObserver = (entities) => {
      const target = entities[0]
      console.log(target.isIntersecting)
      target.isIntersecting && fetchPosts(posts.nextPage)
    }
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver(handleObserver, options)
    loader.current && observer.observe(loader.current)
  }, [posts, loader])

  return (<>
    {!posts.loading
      ? <>
        {filteredPosts.map((post) => (
          <PostPreview
            post={post}
            key={post.slug}
            scrollPosition={scrollPosition}
          />
        ))}
        {(posts.page < posts.pages) &&
          <div className="loading" ref={loader}>
            <h2>Load More</h2>
          </div>}
      </>
      : <Container>
        <div>Loading...</div>
      </Container>

    }
  </>)
}
