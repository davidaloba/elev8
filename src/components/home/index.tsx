import React, { useEffect } from 'react'
import { expandPost, fetchPosts, filterPosts } from '@store/actions'
import { useAppDispatch, useAppSelector } from '@store'
import { useRouter } from 'next/router'

import { Header, Intro, Button, Container, Post, Replies } from '@components'

export const Home: React.FC = ({ preview, children, header, url }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, posts } = useAppSelector((state: RootState) => state)
  console.log(posts)

  useEffect(() => {
    if (!user.userInfo) {
      return router.push('/login')
    }
    fetchPosts('http://localhost:3000/api/posts/')
  }, [router, user.userInfo])

  const filteredPosts = posts.filtered
  const currentPost = posts.current

  const types = ['all', 'tasks', 'freebies', 'premium']
  const filterItems = (type) => {
    dispatch(expandPost({}))
    dispatch(filterPosts(type))
    window.scrollTo(0, 0)
  }

  if (posts.loading) {
    return <Container>
      <Intro header='Loading...' url='' />
    </Container>
  }
  return (
    <>
      <header className='pt-4 pb-6 sticky top-0 z-50 bg-white'>
        <Container>
          <Intro header={header} />
          {user.userInfo && <Header />}
          <div className=' bg-white'>
            <div className="flex justify-between rounded-full bg-slate-300 py-5 px-10 items-center">
              {types.map((type, index) => {
                return (
                  <Button
                    type="button"
                    className="filter-btn"
                    key={index}
                    onClick={() => filterItems(type)}
                  >
                    {type}
                  </Button>
                )
              })}
            </div>
          </div>
        </Container>
      </header>

      <main className="min-h-screen">
        {/* <Alert preview={preview} /> */}
        <main className='pt-0'>
          {user.userInfo && filteredPosts.length > 0 && currentPost.replies === undefined
            ? <Container>
              {filteredPosts.map((post) => (
                <Post
                  post={post}
                  key={post.slug}
                />
              ))}
            </Container>
            : <Replies />
          }</main>
      </main>

      <footer className="border-b bg-accent-1 border-accent-2">
        <div className="container mx-auto px-5">
          <p className="py-2 text-center text-sm">The source code for this blog is <a href="https://github.com/mistertaavetti/next-bootstrap" className="underline hover:text-success duration-200 transition-colors">available on GitHub</a>.</p>
        </div>
      </footer>
    </>
  )
}
