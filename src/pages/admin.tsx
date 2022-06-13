import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { RootState, useAppSelector } from '@store'
import { fetchAdminSummary, fetchData, logoutHandler } from '@store/actions'

import Image from 'next/image'
import { AdminPosts, AdminUsers, AdminReferrals, AdminGiveaway, AdminNotifications, Container, Intro } from '@components'

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { user, admin } = useAppSelector((state: RootState) => state)
  const userInfo = user.userInfo
  const [tab, setTab] = useState('posts')

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }
    userInfo.isAdmin ? setIsLoading(false) : router.push('/app')
    setLoading(true)
    fetchData('/api/admin/summary', userInfo.token, fetchAdminSummary)
    setLoading(false)
  }, [router, userInfo])

  return (<>
    {isLoading
      ? <header className='pt-4 pb-6 sticky top-0 z-50 bg-white'>
        <Container>
          <Intro title='Loading...' />
        </Container>
      </header>
      : <>
      <header className='pt-4 pb-6 sticky top-0 z-50 bg-white'>
        <Container>
          <Intro title='Dashboard' />
          <div className="flex justify-end ">
            <div onClick={logoutHandler} className="cursor-pointer" >[LOG OUT]
            </div>
          </div>
        </Container>
      </header>

      <main className="min-h-screen">
        <section>
          <Container >
              <div className="flex items-center justify-around my-4 ">
                <div onClick={() => setTab('posts')} className=" cursor-pointer flex flex-col items-center justify-center rounded-3xl border p-4  w-1/3 mr-4 " >
                  <div className=""><Image src='/avatar.png' width='32' height='32' className="rounded-full" alt='name' /></div>
                  {!loading
                    ? !admin.summary.postsCount ? <div className=' text-3xl font-bold'>0</div> : <div className=' text-3xl font-bold'>{admin.summary.postsCount}</div>
                    : <div className=' text-3xl font-bold'>Loading...</div>}
                  <div className=" ">Posts</div>
                </div>
                <div onClick={() => setTab('users')} className="cursor-pointer flex flex-col items-center justify-center rounded-3xl border p-4  w-1/3  mr-4 " >
                  <div className=""><Image src='/avatar.png' width='32' height='32' className="rounded-full" alt='name' /></div>
                  {!loading
                    ? !admin.summary.usersCount ? <div className=' text-3xl font-bold'>0</div> : <div className=' text-3xl font-bold'>{admin.summary.usersCount}</div>
                    : <div className=' text-3xl font-bold'>Loading...</div>}
                  <div className=" ">Users</div>
                </div>
                <div onClick={() => setTab('referrals')} className="cursor-pointer flex flex-col items-center justify-center rounded-3xl border p-4  w-1/3 mr-4 " >
                  <div className=""><Image src='/avatar.png' width='32' height='32' className="rounded-full" alt='name' /></div>
                  {!loading
                    ? !admin.summary.withdrawalRequestsCount ? <div className=' text-3xl font-bold'>0</div> : <div className=' text-3xl font-bold'>{admin.summary.withdrawalRequestsCount}</div>
                    : <div className=' text-3xl font-bold'>Loading...</div>}
                  <div className=" ">Withdrawal requests</div>
                </div>
                <div onClick={() => setTab('giveaway')} className="cursor-pointer flex flex-col items-center justify-center rounded-3xl border p-4  w-1/3 mr-4 " >
                  <div className=""><Image src='/avatar.png' width='32' height='32' className="rounded-full" alt='name' /></div>
                  {!loading
                    ? !admin.summary.giveawayCount ? <div className=' text-3xl font-bold'>0</div> : <div className=' text-3xl font-bold'>{admin.summary.giveawayCount}</div>
                    : <div className=' text-3xl font-bold'>Loading...</div>}
                  <div className=" ">Giveaway contests</div>
                </div>
                <div onClick={() => setTab('notifications')} className="cursor-pointer flex flex-col items-center justify-center rounded-3xl border p-4  w-1/3  mr-4 " >
                  <div className=""><Image src='/avatar.png' width='32' height='32' className="rounded-full" alt='name' /></div>
                  {!loading
                    ? !admin.summary.notificationsCount ? <div className=' text-3xl font-bold'>0</div> : <div className=' text-3xl font-bold'>{admin.summary.notificationsCount}</div>
                    : <div className=' text-3xl font-bold'>Loading...</div>}
                  <div className=" ">Notifications</div>
                </div>
            </div>
          </Container>
        </section>
          <hr className="border-accent-2 mt-12 mb-6" />

          {tab === 'posts' && <AdminPosts />}
          {tab === 'users' && <AdminUsers />}
          {tab === 'referrals' && <AdminReferrals />}
          {tab === 'giveaway' && <AdminGiveaway />}
          {tab === 'notifications' && <AdminNotifications/>}

      </main>

      <footer className="border-b bg-accent-1 border-accent-2">
        <div className="container mx-auto px-5">
          <p className="py-2 text-center text-base">Elev8 © copyright 2022</p>
        </div>
      </footer>
    </>
    }
  </>)
}

export default AdminDashboard
