import React, { useEffect } from 'react'

import { expandPost, fetchPosts, filterPosts } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'

import { Intro, Button, Container } from '@components'
import { Header } from './header'
import { Post } from './post'
import { ExpandPost } from './expandpost'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user, posts } = useAppSelector((state: RootState) => state)

  useEffect(() => {
    fetchPosts('http://localhost:3000/api/posts/')
  }, [])

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
      <Intro header='Loading...' />
    </Container>
  }
  return (
    <>
      <header className='pt-4 pb-6 sticky top-0 z-50 bg-white'>
        <Container>
          <Intro header='Home' />
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
          {!currentPost.slug
            ? <Container>
                {filteredPosts.map((post) => (
                  <Post
                    post={post}
                    key={post.slug}
                  />
                ))}
              </Container>
            : <ExpandPost />
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
