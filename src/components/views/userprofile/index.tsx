import { toggleMenu, switchTab, setRequestWithdrawal, fetchReferralData } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'

import Image from 'next/image'
import { Container } from '@components'
import { EditProfile } from './profileedit'
import { ProfileInfo } from './profileinfo'
import { useState } from 'react'
import { getError } from '@db/error'
import axios from 'axios'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  const closeMenu = () => {
    dispatch(toggleMenu())
  }

  const [bankName, setBankName] = useState('')
  const [accountName, setAccountName] = useState('')
  const [amount, setAmount] = useState(3000)
  const [accountNo, setAccountNo] = useState('')

  const handleRequestWithdrawal = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    try {
      const { data } = await axios.put(
        '/api/users/referrals',
        {
          userName: user.userInfo.userName,
          email: user.userInfo.email,
          bankName: bankName,
          accountName: accountName,
          accountNo: accountNo,
          amount: amount
        },
        {
          headers: { authorization: `Bearer ${user.userInfo.token}` }
        }
      )
      fetchReferralData(user.userInfo.referralCode, user.userInfo.email)
      dispatch(setRequestWithdrawal(false))
      alert('your withdrawal request have been submittd and will be disbursed on Monday or Wednesday, whichever comes first')
    } catch (err) {
      alert(getError(err))
    }
  }

  const tabs = ['profile', 'referrals']
  return (<>
    {user.referral.requestWithdrawal && <div className=" px-12 py-16 z-50 fixed h-screen w-screen bg-black bg-opacity-80 " >
      <div onClick={() => { dispatch(setRequestWithdrawal(false)) }} className="cursor-pointer w-max mb-20 pb-1 pt-3 px-3 bg-white rounded-full " >
        <Image src='/close.png' width='20' height='20' alt='[CLOSE]' />
      </div>
      <div className=' mx-auto bg-white rounded-3xl p-6 '>
        <div className='mt-6 mb-10'>
          <h1>Register</h1>
        </div>
        <form className='mb-8'>
          <div className='mb-6'>
            <label htmlFor="email">Bank Name</label>
            <input
              type='text'
              name="bankName"
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className=''
            ></input>
          </div>
          <div className='mb-6'>
            <label htmlFor="email">Account Name</label>
            <input
              type='text'
              name="accountName"
              id="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className=''
            ></input>
          </div>
          <div className='mb-6'>
            <label htmlFor="email">Account Number</label>
            <input
              type='number'
              name="accountNo"
              id="accountNo"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              className=''
            ></input>
          </div>
          <div className='mb-6'>
            <label htmlFor="email">Amount</label>
            <input
              type='number'
              name="amount"
              id="amount"
              min="3000"
              max={user.referral.data.balance}
              step="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className=''
            ></input>
          </div>
          <div>
          </div>
        </form>
        <button onClick={handleRequestWithdrawal} className='mt-4 py-2 rounded-2xl border-none bg-green-700  text-white font-semibold'>Withdraw</button>
      </div>
    </div>}

    <div className='bg-slate-100'>
      <header className='bg-slate-100 py-10 sticky top-0 z-40 '>
        <Container>
          <div className="flex justify-start my-8 items-center">
            {!user.profile.edit && <div onClick={closeMenu} className="cursor-pointer pb-1 pt-2 px-2 bg-white rounded-full " >
              <Image src='/close.png' width='20' height='20' alt='[CLOSE]' />
            </div>}
          </div>
          <div className="flex justify-around rounded-lg bg-white py-5 px-10 items-center">
            {tabs.map((tab, index) => {
              return (
                <div
                  className={`py-2 px-6 rounded-2xl text-xl font-semibold uppercase cursor-pointer ${user.profile.tab === tab && 'bg-green-700 text-white'}`}
                  key={index}
                  onClick={() => {
                    dispatch(switchTab(tab))
                    window.scrollTo(0, 0)
                  }}
                >
                  {tab}
                </div>
              )
            })}
          </div>
        </Container>
        {/* <Alert preview={preview} /> */}
      </header>
      <main className="min-h-screen">
        <Container >
          {user.profile.edit
            ? <EditProfile />
            : <ProfileInfo />
          }
        </Container>
      </main>
      <footer className="border-b bg-accent-1 border-accent-2">
        <div className="container mx-auto px-5">
          <p className="py-2 text-center text-base">Elev8 © copyright 2022</p>
        </div>
      </footer>
    </div>
  </>)
}
