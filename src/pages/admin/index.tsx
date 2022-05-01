import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'

import { getError } from '@db/error'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import { fetchAdminSummary, fetchData, logoutHandler } from '@store/actions'

import NextLink from 'next/link'
import Image from 'next/image'
import { AdminPosts } from '@components'
import { Button, Container, Intro } from '@components'
import Cookies from 'js-cookie'

const AdminDashboard = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, admin } = useAppSelector((state: RootState) => state)
  const userInfo = user.userInfo
  console.log(admin)

  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }
    if (!userInfo.isAdmin) router.push('/app')
    fetchData('/api/admin/summary', userInfo.token, fetchAdminSummary)
  }, [dispatch, router, userInfo])

  return (
    < >
      <header className='pt-4 pb-6 sticky top-0 z-50 bg-white'>
        <Container>
          <Intro title='Dashboard' />
          <div className="flex justify-center items-center">
            <div onClick={logoutHandler} className="cursor-pointer" >[LOG OUT]
            </div>
          </div>
        </Container>
      </header>

      <main className="min-h-screen">
        <section>
          <Container >
            <div className="flex items-center justify-around my-4 ">
              <div className="flex flex-col items-center justify-center rounded-3xl border p-4  w-1/3 mr-4 " >
                <div className=""><Image src='/avatar.png' width='32' height='32' className="rounded-full" alt='name' /></div>
                {admin.summary.postsCount
                  ? <div className=' text-3xl font-bold'>{admin.summary.postsCount}</div>
                  : <div className=' text-3xl font-bold'>Loading...</div>}
                <div className=" ">Posts</div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-3xl border p-4  w-1/3 " >
                <div className=""><Image src='/avatar.png' width='32' height='32' className="rounded-full" alt='name' /></div>
                {admin.summary.usersCount
                  ? <div className=' text-3xl font-bold'>{admin.summary.usersCount}</div>
                  : <div className=' text-3xl font-bold'>Loading...</div>}
                <div className=" ">Users</div>
              </div>
            </div>
          </Container>
        </section>

        <AdminPosts />
      </main>

      <footer className="border-b bg-accent-1 border-accent-2">
        <div className="container mx-auto px-5">
          <p className="py-2 text-center text-sm">The source code for this blog is <a href="https://github.com/mistertaavetti/next-bootstrap" className="underline hover:text-success duration-200 transition-colors">available on GitHub</a>.</p>
        </div>
      </footer>
    </>
  )
}

export default AdminDashboard
