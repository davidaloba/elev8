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
  const [isResetPassword, setIsResetPassword] = useState(false)
  const [isEditPoints, setIsEditPoints] = useState(false)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [referrer, setReferrer] = useState('')

  const [editUser, setEditUser] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [points, setPoints] = useState(null)

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match')
      return
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        email: email,
        password: password,
        userName: userName,
        referrer: referrer
      },
      {
        headers: { authorization: `Bearer ${user.userInfo.token}` }
      }
      )
      alert(`${data.email} was created successfully`)
      setIsCreateUser(false)
      fetchData('/api/admin/users', user.userInfo.token, fetchAdminUsers)
      fetchData('/api/admin/summary', user.userInfo.token, fetchAdminSummary)
      setUserName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' })
      alert(getError(err))
    }
  }

  const resetPasswordHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    if (newPassword !== confirmNewPassword) {
      alert('Password and confirm password do not match')
    }
    try {
      const { data } = await axios.put(`/api/admin/users/${editUser}`, {
        email: editUser,
        password: newPassword
      },
      {
        headers: { authorization: `Bearer ${user.userInfo.token}` }
      }
      )
      alert('Password updated successfully')
      setIsResetPassword(false)
      setNewPassword('')
      setConfirmNewPassword('')
    } catch (err) {
      setNewPassword('')
      setConfirmNewPassword('')
      alert(getError(err))
    }
  }

  const editPointsHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    try {
      const { data } = await axios.put(`/api/admin/users/${editUser}`, {
        email: editUser,
        points: points
      },
      {
        headers: { authorization: `Bearer ${user.userInfo.token}` }
      }
      )
      alert('Points added successfully')
      setIsEditPoints(false)
      setPoints(null)
      fetchData('/api/admin/users', user.userInfo.token, fetchAdminUsers)
    } catch (err) {
      setPoints(null)
      fetchData('/api/admin/users', user.userInfo.token, fetchAdminUsers)
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
          {(!isCreateUser && !isResetPassword && !isEditPoints) && <div align="right" item xs={6}>
            <Button
              onClick={() => {
                setIsCreateUser(true)
                setIsResetPassword(false)
              }}
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
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title='Enter a valid email address'
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
                  required
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
                  required
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
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="email">referrer</label>
                <input
                  type='text'
                  name="referrer"
                  id="referrer"
                  value={referrer}
                  onChange={(e) => setReferrer(e.target.value)}
                  className=''
                  required
                ></input>
              </div>
            </form>
            <div>
              <button onClick={createHandler} className='py-2 mt-3 px-6 rounded-2xl border-none bg-green-700 hover:bg-green-600 focus:outline-none ring-opacity-75 ring-green-400 focus:ring text-white text-xl font-semibold  mr-3'>Create User</button>
              <button onClick={() => setIsCreateUser(false)} className='py-2 mt-3 px-6 rounded-2xl border-none bg-red-700 hover:bg-red-500 focus:outline-none ring-opacity-75 ring-green-400 focus:ring text-white text-xl font-semibold'>Cancel</button>
            </div>
          </Container>
        </div>
        }
        {isResetPassword && <div className='flex flex-wrap justify-between  border  mb-8 p-4 '>
          <Container>
            <div className=' font-bold text-3xl mb-6'> Password Reset for "{editUser}" </div>
            <form className=''>
              <div>
                <label htmlFor="email">Enter New Password</label>
                <input
                  type='password'
                    minLength={6}
                  name="password"
                  id="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='outlined fullWidth'
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="email">Confirm Password</label>
                <input
                  type='password'
                    minLength={6}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className='outlined fullWidth'
                  required
                ></input>
              </div>
            </form>
            <div>
              <button onClick={resetPasswordHandler} className='py-2 mt-3 px-6 rounded-2xl border-none bg-green-700 hover:bg-green-600 focus:outline-none ring-opacity-75 ring-green-400 focus:ring text-white text-xl font-semibold mr-3'>Reset Password</button>
              <button onClick={() => {
                setIsResetPassword(false)
                setNewPassword(null)
              }} className='py-2 mt-3 px-6 rounded-2xl border-none bg-red-700 hover:bg-red-500 focus:outline-none ring-opacity-75 ring-green-400 focus:ring text-white text-xl font-semibold'>Cancel</button>
            </div>
          </Container>
        </div>
        }
        {isEditPoints && <div className='flex flex-wrap justify-between  border  mb-8 p-4 '>
          <Container>
            <div className=' font-bold text-3xl mb-6'> Manage Points for "{editUser}" </div>
            <form className=''>
              <div>
                <label htmlFor="email">Add or Substract Points</label>
                <input
                  type='number'
                  name="points"
                  id="points"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className='outlined fullWidth'
                  required
                ></input>
              </div>
            </form>
            <div>
              <button onClick={editPointsHandler} className='py-2 mt-3 px-6 rounded-2xl border-none bg-green-700 hover:bg-green-600 focus:outline-none ring-opacity-75 ring-green-400 focus:ring text-white text-xl font-semibold mr-3'>Add or Substract Points</button>
              <button onClick={() => {
                setIsEditPoints(false)
                setPoints(null)
              }} className='py-2 mt-3 px-6 rounded-2xl border-none bg-red-700 hover:bg-red-500 focus:outline-none ring-opacity-75 ring-green-400 focus:ring text-white text-xl font-semibold'>Cancel</button>
            </div>
          </Container>
        </div>
        }
        {!isCreateUser && !isResetPassword && !isEditPoints && <table>
          <thead>
            <tr className='border-2' >
              <th className='p-4 border-x'>FIRST NAME</th>
              <th className='p-4 border-x'>LAST NAME</th>
              <th className='p-4 border-x'>EMAIL</th>
              <th className='p-4 border-x'>PHONE NO.</th>
              <th className='p-4 border-x'>USERNAME</th>
              <th className='p-4 border-x'>USERNAME</th>
              <th className='p-4 border-x'>POINTS</th>
            </tr>
          </thead>
          {!admin.users
            ? <div className=' text-3xl font-bold'>loading...</div>
            : <tbody>
              {admin.users.length > 0
                ? (admin.users.map((user) => (
                  <tr key={user.userName} className='border-2' >
                    <td className='p-4 border-x'>{user.profile.firstName}</td>
                    <td className='p-4 border-x'>{user.profile.lastName}</td>
                    <td className='p-4 border-x'>{user.email}</td>
                    <td className='p-4 border-x'>{user.profile.phone}</td>
                    <td className='p-4 border-x'>{user.userName}</td>
                    <td className='p-4 border-x'>{user.referral.referrer}</td>
                    <td className='p-4 border-x'>{user.profile.points}</td>
                    <td className=' w-max'>
                      <Button
                        onClick={() => {
                          setIsResetPassword(true)
                          setEditUser(user.email)
                        }}
                        size="small"
                        variant="contained"
                      >
                        Reset Password
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditPoints(true)
                          setEditUser(user.email)
                        }}
                      >
                        Add Points
                      </Button>
                      <Button
                        onClick={() => deleteHandler(user.email)}
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
