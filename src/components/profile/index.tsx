import React, { useEffect } from 'react'
import { fetchPosts, signout, toggleMenu } from '@store/actions'
import { useAppDispatch, useAppSelector } from '@store'
import { useRouter } from 'next/router'

import { Intro, Container, EditProfile, ProfileInfo } from '@components'
import Cookies from 'js-cookie'

export const Profile: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  useEffect(() => {
    if (!user.userInfo) {
      return router.push('/login')
    }
    fetchPosts('http://localhost:3000/api/posts/')
  }, [router, user.userInfo])

  const closeMenu = async () => {
    dispatch(toggleMenu())
  }

  // TO-DO: FIX signout before redirect err
  const logoutHandler = () => {
    dispatch(signout())
    Cookies.remove('userInfo')
    router.push('/login')
  }

  return (
    <>
      <header className='pt-4 pb-6 sticky top-0 z-50 bg-white'>
        <Container>
          <Intro header='Profile' />
          <div className="flex justify-end items-center">
            <div onClick={closeMenu} className="cursor-pointer" >[CLOSE]
            </div>
          </div>
        </Container>
        {/* <Alert preview={preview} /> */}
      </header>
      <main className="min-h-screen">
        {user.profile.edit
          ? <EditProfile />
          : <ProfileInfo />
        }
        <div className="flex justify-center items-center">
          <div onClick={logoutHandler} className="cursor-pointer" >[LOG OUT]
          </div>
        </div>
      </main>

      <footer className="border-b bg-accent-1 border-accent-2">
        <div className="container mx-auto px-5">
          <p className="py-2 text-center text-sm">The source code for this blog is <a href="https://github.com/mistertaavetti/next-bootstrap" className="underline hover:text-success duration-200 transition-colors">available on GitHub</a>.</p>
        </div>
      </footer>
    </>
  )
}
