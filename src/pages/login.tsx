import { useEffect, useState } from 'react'
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

const Login = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (userInfo) {
      userInfo.isAdmin
        ? router.push('/admin')
        : router.push('/app')
    }
  }, [router, userInfo])

  const [isLogin, setIsLogin] = useState(true)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [dob, setDob] = useState('')
  console.log(userName, email, password, dob)

  const loginHandler = async () => {
    if (email.length > 0 && password.length > 0) {
      try {
        const { data } = await axios.post('/api/users/login', {
          email,
          password
        })
        dispatch(login(data))
        Cookies.set('userInfo', data)
        router.push('/app')
      } catch (err) {
        alert(getError(err))
      }
    } else alert('please enter your email and password to login')
  }

  // const registerHandler = async () => {
  //   if (password !== confirmPassword) {
  //     alert('Password and confirm password are not match')
  //   }
  //   try {
  //     const { data } = await axios.post('/api/users/register', {
  //       userName,
  //       email,
  //       password,
  //       dob
  //     })
  //     dispatch(login(data))
  //     Cookies.set('userInfo', data)
  //     console.log(data)
  //     router.push('/app')
  //   } catch (err) {
  //     alert(getError(err))
  //   }
  // }

  return (
    <>
      <Container>
        <Intro title='Login' url='/' />
        {
          isLogin
            ? <div className='mb-20'>
              {/* <hr className="border-accent-2 mt-28 mb-24" /> */}
              <div className='mt-6 mb-10'>
                {/* <h1>Login</h1> */}
                <p className='mb-4'>Enter the login details provided to in the confirmation email you received</p>
              </div>
              <form className='mb-8'>
                <div className='mb-6'>
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
                <div className=' mb-6'>
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
                <button onClick={(e) => loginHandler(email, password)} className='mt-4 py-2 rounded-2xl border-none bg-green-700  text-white font-semibold'>Login</button>
              </form>
              <div className='text-xl'>
              <p>Haven't registered yet? Click
                <a href='' className='cursor-pointer text-green-900'> here </a>
                to register.
              </p>
              {/* <p>Don't have an account? Click
                <span onClick={(e) => setIsLogin(!isLogin)} className='cursor-pointer text-green-900'> here </span>
                to register.
              </p> */}
              </div>
            </div>
            : <>
              <hr className="border-accent-2 mt-28 mb-24" />
              <h1>Register</h1>
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
                  <label htmlFor="email">Password</label>
                  <input
                    type='password'
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=''
                  // rules={{
                  //   required: true,
                  //   minLength: 6
                  // }}
                  // error={Boolean(errors.password)}
                  // helperText={
                  //   errors.password
                  //     ? errors.password.type === 'minLength'
                  //       ? 'Password length is more than 5'
                  //       : 'Password is required'
                  //     : ''
                  // }
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
                  // rules={{
                  //   required: true,
                  //   minLength: 6
                  // }}
                  // error={Boolean(errors.confirmPassword)}
                  // helperText={
                  //   errors.confirmPassword
                  //     ? errors.confirmPassword.type === 'minLength'
                  //       ? 'Confirm password length is more than 5'
                  //       : 'Confirm password is required'
                  //     : ''
                  // }
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
                  // rules={{
                  //   required: true,
                  //   minLength: 2
                  // }}
                  // error={Boolean(errors.name)}
                  // helperText={
                  //   errors.name
                  //     ? errors.name.type === 'minLength'
                  //       ? 'Name length is more than 1'
                  //       : 'Name is required'
                  //     : ''
                  // }
                  ></input>
                </div>
                <div>
                  <label htmlFor="email">Date of Birth</label>
                  <input
                    type='date'
                    name="dob"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
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
                  <button onClick={(e) => loginHandler(email, password)} className='py-2 px-6 rounded-2xl border-none bg-lime-500 hover:bg-green-600 focus:outline-none ring-opacity-75 ring-green-400 focus:ring text-white text-xl font-semibold'>Sign up</button>
                </div>
              </form>
              <p>Already have an account? Click
                 <span onClick={(e) => setIsLogin(!isLogin)} className='cursor-pointer text-green-900'> here </span>
                 to login.
              </p>
            </>
        }
        <Footer />
      </Container>
    </>
  )
}

export default Login
