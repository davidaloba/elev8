import { useEffect, useRef, useState } from 'react'

import { expandPost, fetchPosts, filterPosts, getScrollPosition } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'

import { Intro, Container } from '@components'
import { AppBar } from './appbar'
import { Post } from './post'
import { ExpandPost } from './expandpost'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { user, posts } = useAppSelector((state: RootState) => state)

  useEffect(() => {
    fetchPosts('/api/posts')
  }, [])

  const currentPost = posts.current
  const filteredPosts = posts.filtered.posts

  const types = ['all', 'tasks', 'freebies', 'premium']
  const filterItems = (type) => {
    dispatch(expandPost({}))
    dispatch(filterPosts(type))
    dispatch(getScrollPosition(0))
    window.scrollTo(0, 0)
  }

  // #######################################################################################
  const [postList, setPostList] = useState({ list: [1, 2, 3, 4] })
  // tracking on which page we currently are
  const [page, setPage] = useState(1)
  // add loader reference
  const loader = useRef(null)
  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setPage(_page => _page + 1)
    }
  }
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    }
    // initialize IntersectionObserver and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [])
  useEffect(() => {
    // here we simulate adding new posts to List
    const newList = postList.list.concat([1, 1, 1, 1])
    setPostList({
      list: newList
    })
  }, [page, postList.list])
  // #######################################################################################

  if (posts.loading) {
    return <Container>
      <Intro title='Loading...' />
    </Container>
  }
  return (
    <>
      <header className='pt-4 pb-6 sticky bg-slate-100 top-0 z-50'>
        <Container>
          <Intro title='Home' />
          {user.userInfo && <AppBar />}
            <div className="flex justify-between rounded-full bg-white py-5 px-10 items-center">
              {types.map((type, index) => {
                return (
                  <div
                    className={`py-2 px-6 rounded-2xl text-xl font-semibold uppercase cursor-pointer ${posts.filtered.type === type && 'bg-green-700 text-white'}`}
                    key={index}
                    onClick={() => filterItems(type)}
                  >
                    {type}
                  </div>
                )
              })}
            </div>
        </Container>
      </header>
      <main className="min-h-screen">
        <Container className='pt-0'>
        {/* <Alert preview={preview} /> */}
          {!currentPost.slug
            ? <>
                {filteredPosts.map((post) => (
                  <Post
                    post={post}
                    key={post.slug}
                  />
                ))}
              <div ref={loader}>
                <h2 className="text-center">Load More</h2>
              </div>
              </>
            : <ExpandPost />
          }
          </Container>
      </main>
      <footer className="border-b bg-accent-1 border-accent-2">
        <div className="container mx-auto px-5">
          <p className="py-2 text-center text-base">Elev8 © copyright 2022</p>
        </div>
      </footer>
    </>
  )
}
