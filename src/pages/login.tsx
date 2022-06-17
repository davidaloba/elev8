import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { RootState, useAppSelector, useAppDispatch } from '@store'
import { getError } from '@db/error'
import Cookies from 'js-cookie'
import axios from 'axios'

import Layout from '@components/landing/layout'
import Container from '@components/landing/components/container'
import Link from 'next/link'

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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  return (
  <Layout>
      <Container>
       <div className='mb-20'>
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
                <p>Don't have an account? Click <Link href='/register' passHref>
                  <span className='cursor-pointer text-green-900'> here </span>
                </Link>
                  to register.
                </p>
              </div>
            </div>

      </Container>
  </Layout>
  )
}

export default Login
