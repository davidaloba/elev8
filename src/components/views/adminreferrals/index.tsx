import { useEffect, useState } from 'react'

import axios from 'axios'

import { getError } from '@db/error'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import { fetchAdminWithdrawals, fetchAdminSummary, fetchData, setAdminLoading } from '@store/actions'

import {
  Button, Container
} from '@components'

export const AdminReferrals = () => {
  const dispatch = useAppDispatch()
  const { admin, user } = useAppSelector((state: RootState) => state)

  console.log(admin.withdrawalRequests)

  useEffect(() => {
    fetchData('/api/admin/users/withdrawals', user.userInfo.token, fetchAdminWithdrawals)
  }, [])

  const [isCreateUser, setIsCreateUser] = useState(false)
  const [isResetPassword, setIsResetPassword] = useState(false)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [editUser, setEditUser] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const statusHandler = async (status, userName, withdrawalId, amount) => {
    if (!window.confirm(`Are you sure you want to ${status} this withrawal request?`)) {
      return
    }
    try {
      const { data } = await axios.put(`/api/admin/users/withdrawals/?status=${status}`, {
        userName: userName,
        withdrawalId: withdrawalId,
        amount: amount
      },
      {
        headers: { authorization: `Bearer ${user.userInfo.token}` }
      }
      )
      alert(`${withdrawalId} was ${status} successfully`)
      fetchData('/api/admin/users/withdrawals', user.userInfo.token, fetchAdminWithdrawals)
      fetchData('/api/admin/summary', user.userInfo.token, fetchAdminSummary)
    } catch (err) {
      alert(getError(err))
    }
  }
  const rejectHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    if (newPassword !== confirmNewPassword) {
      alert('Password and confirm password do not match')
    }
    try {
      const { data } = await axios.put(`/api/admin/withdrawals/${editUser}`, {
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

  return (
    <section className="mt-24 mb-12">
      <div>
        <div className=" flex justify-between items-center mb-8">
          <div className=''>
            <div className='text-6xl font-bold '>
              Withdrawals
            </div>
          </div>
          {(!isCreateUser && !isResetPassword) && <div >
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
      </div>
      <Container>
        <table>
          <thead>
            <tr className='border-2' >
              <th className='p-4 border-x'>USERNAME</th>
              <th className='p-4 border-x'>ID</th>
              <th className='p-4 border-x'>BANK</th>
              <th className='p-4 border-x'>NAME</th>
              <th className='p-4 border-x'>ACCOUNT</th>
              <th className='p-4 border-x'>AMOUNT</th>
              <th className='p-4 border-x'>STATUS</th>
            </tr>
          </thead>
          {!admin.withdrawalRequests
            ? <tbody className=' text-3xl font-bold'>
              <tr className='border-2' ><td className='p-4 border-x'>loading...</td></tr>
            </tbody>
            : <tbody>
              {admin.withdrawalRequests.length > 0
                ? (admin.withdrawalRequests.map((withdrawal) => (
                  <tr key={withdrawal.userName} className='border-2' >
                    <td className='p-4 border-x'>{withdrawal.userName}</td>
                    <td className='p-4 border-x'>{withdrawal.withdrawalId}</td>
                    <td className='p-4 border-x'>{withdrawal.bankName}</td>
                    <td className='p-4 border-x'>{withdrawal.accountName}</td>
                    <td className='p-4 border-x'>{withdrawal.accountNo}</td>
                    <td className='p-4 border-x'>{withdrawal.amount}</td>
                    <td className='p-4 border-x'>{withdrawal.status}</td>
                    <td className=' w-max'>
                      <Button
                        onClick={() => statusHandler('confirmed', withdrawal.userName, withdrawal.withdrawalId, withdrawal.amount)}
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={() => statusHandler('rejected', withdrawal.userName, withdrawal.withdrawalId, withdrawal.amount)}
                        size="small"
                        variant="contained"
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                  )))
                : <tr className='border-2 font-italic ' > <div className=' px-10 py-4 italic' >No withdrawals...  </div> </tr>
              }
            </tbody>}
        </table>
      </Container>
    </section>
  )
}
