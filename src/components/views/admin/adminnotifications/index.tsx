import { useEffect, useState } from 'react'

import axios from 'axios'

import { getError } from '@db/error'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import { fetchAdminNotifications, fetchAdminSummary, fetchData } from '@store/actions'

import {
  Button, Container
} from '@components'

export const AdminNotifications = () => {
  const dispatch = useAppDispatch()
  const { admin, user } = useAppSelector((state: RootState) => state)

  useEffect(() => {
    fetchData('/api/admin/notifications', user.userInfo.token, fetchAdminNotifications)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isCreateNotifications, setIsCreateNotification] = useState(false)

  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const createNotification = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    try {
      const { data } = await axios.post('/api/admin/notifications',
        {
          slug: slug,
          title: title,
          body: body
        },
        {
          headers: { authorization: `Bearer ${user.userInfo.token}` }
        }
      )
      dispatch({ type: 'CREATE_SUCCESS' })
      alert(`${data.title} was created successfully`)
      setIsCreateNotification(false)
      setSlug('')
      setTitle('')
      setBody('')
      fetchData('/api/admin/notifications', user.userInfo.token, fetchAdminNotifications)
      fetchData('/api/admin/summary', user.userInfo.token, fetchAdminSummary)
    } catch (err) {
      alert(getError(err))
    }
  }

  const deleteNotification = async (notificationId) => {
    // if (!window.confirm('Are you sure you want to delete this notifications?')) {
    //   return
    // }
    try {
      await axios.delete(`/api/admin/notifications/${notificationId}`, {
        headers: { authorization: `Bearer ${user.userInfo.token}` }
      })
      fetchData('/api/admin/notifications', user.userInfo.token, fetchAdminNotifications)
      fetchData('/api/admin/summary', user.userInfo.token, fetchAdminSummary)
      alert('Notifications deleted successfully')
    } catch (err) {
      alert(getError(err))
    }
  }

  return (
    <section className="mt-24 mb-12">
      <Container>
        <div className=" flex justify-between items-center mb-8">
          <div className=''>
            <div className='text-6xl font-bold '>
              Notifications
            </div>
          </div>
          {!isCreateNotifications && <div>
            <Button
              onClick={() => setIsCreateNotification(true)}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          </div>}
        </div>
      </Container>

        {isCreateNotifications && <div className='flex flex-wrap justify-between  border  mb-8 p-4 '>
          <Container>
            <form action="">
              <div>
                <label htmlFor="slug">Slug</label>
                <input
                  type='text'
                  name="slug"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className='outlined fullWidth'
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="title">Title</label>
                <input
                  type='text'
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='outlined fullWidth'
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="body">Body</label>
                <textarea
                  type='text'
                  name="body"
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className='block outlined fullWidth'
                  required
                ></textarea>
              </div>
            </form>
            <div>
              <button onClick={createNotification} className='py-2 mt-3 px-6 rounded-2xl border-none bg-green-700 hover:bg-green-600 focus:outline-none ring-opacity-75 ring-green-400 focus:ring text-white text-xl font-semibold  mr-3'>Create Notification</button>
              <button onClick={() => setIsCreateNotification(false)} className='py-2 mt-3 px-6 rounded-2xl border-none bg-red-700 hover:bg-red-500 focus:outline-none ring-opacity-75 ring-green-400 focus:ring text-white text-xl font-semibold'>Cancel</button>
            </div>
          </Container>
        </div>
        }
      {!isCreateNotifications && <Container>
        <table>
          <thead>
            <tr className='border-2' >
              <th className='p-4 border-x'>SLUG</th>
              <th className='p-4 border-x'>TITLE</th>
              <th className='p-4 border-x'>BODY</th>
            </tr>
          </thead>
          {!admin.notifications
            ? <tbody><tr><td className=' text-3xl font-bold' >loading...</td></tr></tbody>
            : <tbody>
              {admin.notifications.length > 0
                ? (admin.notifications.map((notification) => (
                  <tr key={notification.slug} className='border-2' >
                    <td className='p-4 border-x'>{notification.slug}</td>
                    <td className='p-4 border-x'>{notification.title}</td>
                    <td className='p-4 border-x'>{notification.body.substring(0, 120)}...</td>
                    <td>
                      <Button
                        onClick={() => deleteNotification(notification.slug)}
                        size="small"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                  )))
                : <tr className='border-2 font-italic ' > <div className=' px-10 py-4 italic' >No notifications...  </div> </tr>
              }
            </tbody>}
        </table>
      </Container>
        }

    </section>
  )
}
