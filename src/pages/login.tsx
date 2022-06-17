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
       <span className="relative">Login</span> </span>
        </h2>
        {/* <p className=" max-w-7xl">
            Enjoy all of these benefits and more by signing up to join the Elev8 community today.
        </p> */}
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

      </Container>
  </Layout>
  )
}

export default Login
