import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { RootState, useAppSelector, useAppDispatch } from '@store'
import { login } from '@store/actions'
import { getError } from '@db/error'
import Cookies from 'js-cookie'
import axios from 'axios'

import {
  Container,
  Intro,
  Footer
} from '@components'
import Link from 'next/link'

const Giveaway = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { slug, title } = router.query
  const [loading, setLoading] = useState(true)
  const [notpaid, setNotPaid] = useState(true)

  useEffect(() => {
    const isPremiumPaid = userInfo.profile && userInfo.profile.paid.includes(slug)
    const isGiveawayDone = userInfo.profile && userInfo.profile.giveaway.includes(slug)

    if (isGiveawayDone === true) {
      setLoading(true)
      setNotPaid(false)
      alert('you have already applied for this giveaway')
      router.push('/app')
      return
    }
    if (isPremiumPaid === true) {
      setLoading(false)
      setNotPaid(false)
    }
  }, [router, slug, userInfo])

  const [phone, setPhone] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountName, setAccountName] = useState('')
  const [accountNo, setAccountNo] = useState('')

  const form = useRef()
  const submitHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    try {
      const { data } = await axios.put('/api/users/giveaway', {
        email: userInfo.email,
        slug: slug,
        userName: userInfo.userName,
        phone: phone,
        bankName: bankName,
        accountName: accountName,
        accountNo: accountNo
      },
      {
        headers: { authorization: `Bearer ${userInfo.token}` }
      })
      dispatch(login(data))
      Cookies.set('userInfo', data)
      alert(`You have successfully applied for ${title} `)
      // router.push('/app')
    } catch (err) {
      alert(getError(err))
    }
  }

  return (
    <>
      <Container>
        <Intro title='Giveaway' url='/' />
        {loading
          ? <div className='mb-20'> Loading... </div>
          : <div className='mb-20'>
            <hr className="border-accent-2 mt-28 mb-24" />
            <div className='mt-6 mb-10'>
              <h1>Submit Your Details to Apply</h1>
            </div>
            <form ref={form} className='mb-8'>
              <div className='mb-6'>
                <label htmlFor="email">Phone Number</label>
                <input
                  type='phone'
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className=''
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title='Enter a valid email address'
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
                  required
                ></input>
              </div>
              <div className='mb-6'>
                <label htmlFor="email">Bank Name</label>
                <input
                  type='text'
                  name="bankName"
                  id="bankName"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className=''
                  required
                ></input>
              </div>
              <div className='mb-6'>
                <label htmlFor="email">Account Number</label>
                <input
                  type='text'
                  minLength={10}
                  maxLength={10}
                  name="accountNo"
                  id="accountNo"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className=''
                  required
                ></input>
              </div>
            </form>
            <button onClick={submitHandler} className='mt-4 py-2 rounded-2xl border-none bg-green-700  text-white font-semibold'>Apply</button>
          </div>
        }
        {notpaid && <Link href='./' passHref>
          <div className="flex items-center p-4 cursor-pointer border ">
            You are not allowed to view this page. Click to go back
          </div>
        </Link>}
        <Footer />
      </Container>
    </>
  )
}

export default Giveaway
