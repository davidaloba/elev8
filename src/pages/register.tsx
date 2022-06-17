import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { RootState, useAppSelector, useAppDispatch } from '@store'
import { login } from '@store/actions'
import { getError } from '@db/error'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'

import Layout from '@components/landing/layout'
import Container from '@components/landing/components/container'
import Link from 'next/link'

const Login = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { login, ref } = router.query
  const [isLogin, setIsLogin] = useState(login)

  useEffect(() => {
    if (userInfo) {
      userInfo.isAdmin
        ? router.push('/admin')
        : router.push('/app')
    }
    console.log(login)
    setIsLogin(login)
  }, [login, router, userInfo])

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
    public_key: 'FLWPUBK-336e1502b66347f21711416b1f2b7c66-X',
    tx_ref: Date.now(),
    amount: 5000,
    currency: 'NGN',
    payment_options: 'card,mobilemonesy,ussd',
    customer: {
      email: email,
      name: userName
    },
    customizations: {
      title: 'Elev8 Registration',
      description: 'Payment for access to the Elev8 platform',
      logo: '/logo.png'
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
            referrer: ref
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

  const regiserForm = useRef()
  const passwordInput = useRef()
  const emailInput = useRef()
  const userNameInput = useRef()
  const form = regiserForm.current
  const pwInput = passwordInput.current
  const emInput = emailInput.current
  const unInput = emailInput.current

  const registerHandler = async () => {
    if (emInput.validity.patternMismatch) {
      emInput.setCustomValidity('You have entered an invalid email aaddress')
      alert(emInput.validationMessage)
      return
    }
    if (pwInput.validity.patternMismatch) {
      pwInput.setCustomValidity('Password must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters')
      alert(pwInput.validationMessage)
      return
    }
    if (unInput.validity.tooShort) {
      unInput.setCustomValidity('You haven\'t entered a userName')
      alert(unInput.validationMessage)
      return
    }
    if (!form.checkValidity()) {
      alert('Please check that you have entered all fields correctly')
      return
    }
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match')
      return
    }
    paymenthandler()
  }
  return (
  <Layout>
      <Container>
      <div className=" md:mx-auto mb-10 mt-16 px-8 md:mb-12 sm:text-center ">
        <h2 className=" max-w-7xl mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
           <span className="relative inline-block">
       <svg
        viewBox="0 0 52 24"
        fill="currentColor"
        className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-orange-600 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
       >
        <defs>
         <pattern
          id="232db96b-4aa2-422f-9086-5a77996d1df1"
          x="0"
          y="0"
          width=".135"
          height=".30"
         >
          <circle cx="1" cy="1" r=".7" />
         </pattern>
        </defs>
        <rect
         fill="url(#232db96b-4aa2-422f-9086-5a77996d1df1)"
         width="52"
         height="24"
        />
       </svg>
       <span className="relative">Register</span> </span>
        </h2>
        {/* <p className=" max-w-7xl">
            Enjoy all of these benefits and more by signing up to join the Elev8 community today.
        </p> */}
      </div>

              <form ref={regiserForm} className='mb-8' >
                <div className='mb-6'>
                  <label htmlFor="email">Email</label>
                  <input
                    ref={emailInput}
                    type='email'
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=' invalid:border-red-800 invalid:border-2'
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title='Enter a valid email address'
                  ></input>
                </div>
                <div className='mb-6'>
                  <label htmlFor="email">Password </label>
                  <input
                    ref={passwordInput}
                    type='password'
                    minLength={6}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                    className='invalid:border-red-800 invalid:border-2'
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
                    ref={userNameInput}
                    type='text'
                    name="userName"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className=' invalid:border-red-800 invalid:border-2'
                    minLength={3}
                    required
                  ></input>
                </div>
                <div className='mb-6'>
                  <label htmlFor="email">Referral Code</label>
                  <input
                    type='text'
                    name="referrer"
                    id="referrer"
                    value={ref}
                    className=''
                    disabled
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
                  <Link href='/login' passHref>
                  <span className='cursor-pointer text-green-900'> here </span>
                  </Link>
                  to login.
                </p>
              </div>
      </Container>
  </Layout>
  )
}

export default Login
