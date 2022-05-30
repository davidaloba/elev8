import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { RootState, useAppSelector, useAppDispatch } from '@store'
import { login } from '@store/actions'
import { getError } from '@db/error'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'

import {
  Container,
  Intro,
  Footer
} from '@components'

const Login = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { register } = router.query

  useEffect(() => {
    if (userInfo) {
      userInfo.isAdmin
        ? router.push('/admin')
        : router.push('/app')
    }
  }, [router, userInfo])

  const [isLogin, setIsLogin] = useState(register)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [referrer, setReferrer] = useState('')

  const loginForm = useRef()
  const loginHandler = async () => {
    const form = loginForm.current
    if (!form.checkValidity()) {
      return
    }
    try {
      const { data } = await axios.post('/api/users/login', {
        email: email,
        password: password
      })
      dispatch(login(data))
      Cookies.set('userInfo', data)
      if (data.isAdmin) router.push('/admin')
      else router.push('/app')
    } catch (err) {
      alert(getError(err))
    }
  }

  const config = {
    public_key: 'FLWPUBK_TEST-c2672daab1a08b315c548e415bca5a75-X',
    tx_ref: Date.now(),
    amount: 4000,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      name: userName
    },
    customizations: {
      title: 'Elev8 Registration',
      description: 'Payment for access to the Elev8 platform',
      logo: '/logo.jpg'
    }
  }
  const handleFlutterPayment = useFlutterwave(config)

  const paymenthandler = () => {
    handleFlutterPayment({
      callback: async (response) => {
        if (response.status !== 'successful') {
          alert(` Your payment was ${response.status}.Please try again later`)
          return
        }
        try {
          const { data } = await axios.post('/api/users/register', {
            transaction_id: response.transaction_id,
            userName,
            email,
            password,
            referrer
          })
          dispatch(login(data))
          Cookies.set('userInfo', data)
          router.push('/app')
        } catch (err) {
          alert(getError(err))
        }
        closePaymentModal() // this will close the modal programmatically
      },
      onClose: () => {
      }
    })
  }

  const registerForm = useRef()
  const form = registerForm.current
  const registerHandler = async (e) => {
    if (!form.checkValidity()) {
      return
    }
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match')
      return
    }
    paymenthandler()
  }
  return (
    <>
      <Container>
        <Intro title='Login' url='/' />
        {
          isLogin
            ? <div className='mb-20'>
              <hr className="border-accent-2 mt-28 mb-24" />
              <div className='mt-6 mb-10'>
                <h1>Login</h1>
              </div>
              <form ref={loginForm} className='mb-8'>
                <div className='mb-6'>
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
                <div className=' mb-6'>
                  <label htmlFor="email">Password</label>
                  <input
                    type='password'
                    minLength={6}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=''
                    required
                  ></input>
                </div>
              </form>
              <button onClick={loginHandler} className='mt-4 py-2 rounded-2xl border-none bg-green-700  text-white font-semibold'>Login</button>
              <div className='text-xl'>
                <p>Don't have an account? Click
                  <span onClick={(e) => setIsLogin(!isLogin)} className='cursor-pointer text-green-900'> here </span>
                  to register.
                </p>
              </div>
            </div>
            : <div className='mb-20'>
              <hr className="border-accent-2 mt-28 mb-24" />
              <div className='mt-6 mb-10'>
                <h1>Register</h1>
              </div>
              <form ref={registerForm} className='mb-8' >
                <div className='mb-6'>
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
                <div className='mb-6'>
                  <label htmlFor="email">Password</label>
                  <input
                    type='password'
                    minLength={6}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=''
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"

                  ></input>
                </div>
                <div className='mb-6'>
                  <label htmlFor="email">Confirm Password</label>
                  <input
                    type='password'
                    minLength={6}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className=''
                    required
                  ></input>
                </div>
                <div className='mb-6'>
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
                <div className='mb-6'>
                  <label htmlFor="email">Referral Code</label>
                  <input
                    type='text'
                    name="referrer"
                    id="referrer"
                    value={referrer}
                    onChange={(e) => setReferrer(e.target.value)}
                    className=''
                  // rules={{
                  //   required: true,
                  //   pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                  // }}
                  // error={Boolean(errors.email)}
                  // helperText={
                  //   errors.email
                  //     ? errors.email.type === 'pattern'
                  //       ? 'Email is not valid'
                  //       : 'Email is required'
                  //     : ''
                  // }
                  ></input>
                </div>
                <div>
                </div>
              </form>
              <button onClick={registerHandler} className='mt-4 py-2 rounded-2xl border-none bg-green-700  text-white font-semibold' >Register</button>
              <div className='text-xl'>
                <p>Already have an account? Click
                  <span onClick={(e) => setIsLogin(!isLogin)} className='cursor-pointer text-green-900'> here </span>
                  to login.
                </p>
              </div>
            </div>
        }
        <Footer />
      </Container>
    </>
  )
}

export default Login
