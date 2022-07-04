import { toggleMenu, fetchNotifications, fetchData } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'

import Image from 'next/image'
import { Container } from '@components'
import { useEffect, useState } from 'react'

export const Notifications = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  const [expand, setExpand] = useState(false)
  const [viewedNotification, setViewedNotification] = useState({})

  useEffect(() => {
    fetchData('/api/users/notifications', user.userInfo.token, fetchNotifications)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closeMenu = () => {
    dispatch(toggleMenu('home'))
  }

  const expandHandler = () => {
    setExpand(true)
    setViewedNotification()
    window.scrollTo(0, 0)
  }

  return (<>
    <div className='bg-slate-100'>

      <header className='bg-slate-100 py-10 sticky top-0 z-40 '>
        <Container>
          <div className="flex justify-start my-8 items-center">
             <div onClick={closeMenu} className="cursor-pointer pb-1 pt-2 px-2 bg-white rounded-full " >
              <Image src='/close.png' width='20' height='20' alt='[CLOSE]' />
            </div>
          </div>
        </Container>
        {/* <Alert preview={preview} /> */}
      </header>

      <main className="min-h-screen">
      <Container >
          <div className='font-bold text-3xl mb-10'>Notifications</div>
          <div className=' flex flex-col items-start bg-white border rounded-3xl mb-8 p-6 '>
            {user.notifications.length > 0
              ? user.notifications.map((notification) => <>
                <div key='' className='flex justify-between items-start w-full p-4 text-lg border rounded-xl mb-6'>
                  <div className="rounded-full w-auto mr-6">
                    {notification.status === 'unread' && <div className="rounded-full bg-red-500 h-min py-1 px-2 mr-4">
                      <Image src='/avatar.png' width='24' height='24' alt='' />
                    </div>}
                    {notification.status === 'read' && <div className="rounded-full bg-green-500 h-min py-1 px-2 mr-4">
                      <Image src='/avatar.png' width='24' height='24' alt='' />
                    </div>}
                  </div>
                  <div className='w-auto grow'>
                    <div className="font-bold mb-3">RE: {notification.title}</div>
                    <div className='mb-3'>
                      <div className="mb-1">
                          {notification.body}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="border-accent-2 mt-28 mb-6" />
              </>)
              : <div className=' px-10 py-4 italic font-italic ' >No notifications...  </div>

            }
          </div>
        </Container>
        {/* {expand === true && <Container >
          <div className='font-bold text-3xl mb-10'>RE: ${viewedNotification.title}</div>
          <div className=' flex flex-col items-start bg-white border rounded-3xl mb-8 p-6 '>
            <div key='' className='flex justify-between items-start w-full p-4 text-lg border rounded-xl mb-6'>
              <div className="rounded-full w-auto mr-6">
                {viewedNotification.status === 'unread' && <div className="rounded-full bg-red-500 h-min py-1 px-2 mr-4">
                  <Image src='/avatar.png' width='24' height='24' alt='' />
                </div>}
                {viewedNotification.status === 'read' && <div className="rounded-full bg-green-500 h-min py-1 px-2 mr-4">
                  <Image src='/avatar.png' width='24' height='24' alt='' />
                </div>}
              </div>
              <div className='w-auto grow'>
                <div className="font-bold mb-3"></div>
                <div className='mb-3'>
                  <div className="mb-1">
                    {viewedNotification.body}
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-accent-2 mt-28 mb-6" />
          </div>
        </Container>} */}
      </main>

      <footer className="border-b bg-accent-1 border-accent-2">
        <div className="container mx-auto px-5">
          <p className="py-2 text-center text-base">Elev8 © copyright 2022</p>
        </div>
      </footer>

    </div>
  </>)
}
