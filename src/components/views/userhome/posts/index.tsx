import { useEffect, useRef, useState } from 'react'
import { initPosts, fetchPosts } from '@store/actions'
import { RootState, useAppSelector } from '@store'
import { PostPreview } from './post'
import { Container } from '@components'
import InfiniteScroll from 'react-infinite-scroll-component'

export const Posts = () => {
  const { posts } = useAppSelector((state: RootState) => state)
  const filteredPosts = posts.filtered.posts
  const [scrollPosition, getScrollPosition] = useState(0)

  useEffect(() => {
    (posts.page === 0) && fetchPosts(0)

    if (posts.scrollPosition > 0) document.documentElement.scrollTop = document.body.scrollTop = posts.scrollPosition

    const handleScroll = () => {
      const position = window.pageYOffset
      getScrollPosition(position)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [posts.nextPage, posts.page, posts.scrollPosition])

  return (<>
    {!posts.loading
      ? <>
        <InfiniteScroll
          dataLength={filteredPosts.length}
          next={() => fetchPosts(posts.nextPage)}
          hasMore={posts.pages !== posts.page}
          loader={<h4>Loading...</h4>}
          scrollThreshold={1}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more posts</b>
            </p>
          }
        >
          {filteredPosts.map((post) => (
            <PostPreview
              post={post}
              key={post.slug}
              scrollPosition={scrollPosition}
            />
          ))}
        </InfiniteScroll>
      </>
      : <Container>
        <div>Loading...</div>
      </Container>

    }
  </>)
}
