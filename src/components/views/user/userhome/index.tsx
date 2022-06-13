import { expandPost, filterPosts, setScrollPosition } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'

import { Intro, Container } from '@components'
import { AppBar } from './appbar'
import { Posts } from './posts'
import { ViewPost } from './viewpost'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { user, posts } = useAppSelector((state: RootState) => state)

  const currentPost = posts.current

  const types = ['all', 'tasks', 'freebies', 'premium']
  const filterItems = (type) => {
    dispatch(expandPost({}))
    dispatch(filterPosts(type))
    dispatch(setScrollPosition(0))
    window.scrollTo(0, 0)
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
            ? <Posts />
            : <ViewPost />
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
