import { useEffect, useState } from 'react'

import axios from 'axios'

import { getError } from '@db/error'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import { fetchAdminUsers, fetchAdminSummary, fetchData } from '@store/actions'

import {
  Button, Container
} from '@components'

export const AdminUsers = () => {
  const dispatch = useAppDispatch()
  const { admin, user } = useAppSelector((state: RootState) => state)

  useEffect(() => {
    fetchData('/api/admin/users', user.userInfo.token, fetchAdminUsers)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isCreateUser, setIsCreateUser] = useState(false)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match')
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        email: email,
        password: password,
        userName: userName
      },
      {
        headers: { authorization: `Bearer ${user.userInfo.token}` }
      }
      )
      dispatch({ type: 'CREATE_SUCCESS' })
      alert(`${data} was created successfully`)
      setIsCreateUser(false)
      fetchData('/api/admin/users', user.userInfo.token, fetchAdminUsers)
      fetchData('/api/admin/summary', user.userInfo.token, fetchAdminSummary)
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' })
      alert(getError(err))
    }
  }

  const deleteHandler = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }
    try {
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: { authorization: `Bearer ${user.userInfo.token}` }
      })
      fetchData('/api/admin/users', user.userInfo.token, fetchAdminUsers)
      fetchData('/api/admin/summary', user.userInfo.token, fetchAdminSummary)
      alert('User deleted successfully')
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
              Users
            </div>
          </div>
          {!isCreateUser && <div align="right" item xs={6}>
            <Button
              onClick={() => setIsCreateUser(true)}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          </div>}
        </div>
      </Container>
      <Container>
        {isCreateUser && <div className='flex flex-wrap justify-between  border  mb-8 p-4 '>
          <Container>
            <form className=''>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type='email'
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=''
                ></input>
              </div>
              <div>
                <label htmlFor="email">Password</label>
                <input
                  type='password'
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=''
                ></input>
              </div>
              <div>
                <label htmlFor="email">Confirm Password</label>
                <input
                  type='password'
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className=''
                ></input>
              </div>
              <div>
                <label htmlFor="email">Username</label>
                <input
                  type='text'
                  name="userName"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className=''
                ></input>
              </div>
            </form>
              <div>
                <button onClick={createHandler} className='py-2 mt-3 px-6 rounded-2xl border-none bg-lime-500 hover:bg-green-600 focus:outline-none ring-opacity-75 ring-green-400 focus:ring text-white text-xl font-semibold'>Create User</button>
              </div>
          </Container>
        </div>
        }
        {!isCreateUser && <table>
          <thead>
            <tr className='border-2' >
              <th className='p-4 border-x'>USERNAME</th>
              <th className='p-4 border-x'>EMAIL</th>
            </tr>
          </thead>
          {!admin.users
            ? <div className=' text-3xl font-bold'>loading...</div>
            : <tbody>
              {admin.users.length > 0
                ? (admin.users.map((user) => (
                  <tr key={user.userName} className='border-2' >
                    <td className='p-4 border-x'>{user.userName}</td>
                    <td className='p-4 border-x'>${user.email}</td>
                    <td>
                      <Button
                        onClick={() => deleteHandler(user._id)}
                        size="small"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                  )))
                : <tr className='border-2 font-italic ' > <div className=' px-10 py-4 italic' >No users...  </div> </tr>
              }
            </tbody>}
        </table>}
      </Container>
    </section>
  )
}
