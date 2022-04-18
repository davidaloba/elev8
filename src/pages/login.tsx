import { useEffect, useState } from 'react'
import { AppState, useAppSelector, useAppDispatch } from '@store'
import { login } from '@store/actions'
import { getError } from '@db/error'
import Cookies from 'js-cookie'
import axios from 'axios'

import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import {
  Layout,
  Container,
  Header,
  Button,
  Intro
} from '@components'

const Login = () => {
  const { userInfo, loading } = useAppSelector((state:AppState) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { redirect } = router.query // login?redirect=/shipping

  useEffect(() => {
    if (userInfo) {
      router.push('/')
    }
  }, [router, userInfo])

  const [isLogin, setIsLogin] = useState(true)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const loginHandler = async (email, password) => {
    console.log(email, password)
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password
      })
      dispatch(login(data))
      Cookies.set('userInfo', data)
      router.push('/')
    } catch (err) {
      alert(getError(err))
    }
  }

  const registerHandler = async (userName, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match')
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        userName,
        email,
        password
      })
      dispatch(login(data))
      Cookies.set('userInfo', data)
      console.log(data)
      router.push('/')
    } catch (err) {
      alert(getError(err))
    }
  }

  console.log(userInfo)

  return (
    <Layout title="Login">
      <Container>
        <Header />
        <Intro header='Blog' url='/' />
      {
      isLogin
        ? <>
        <hr className="border-accent-2 mt-28 mb-24" />
        <h1>Login</h1>
        <form className=''>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type='email'
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='outlined fullWidth'
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
            </li>
            <li>
              <label htmlFor="email">Password</label>
              <input
                type='password'
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='outlined fullWidth'
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
            </li>
          </ul>
          <Button onClick={(e) => loginHandler(email, password)} type="button" color="primary">Login</Button>
        </form>
        <p>Don't have an account?</p>
        <button onClick={(e) => setIsLogin(!isLogin)}>Register</button>
      </>
        : <>
        <hr className="border-accent-2 mt-28 mb-24" />
            <h1>Register</h1>
        <form className=''>
          <ul>
            <li>
              <label htmlFor="email">Username</label>
              <input
                type='text'
                name="userName"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className='outlined fullWidth'
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
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type='email'
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='outlined fullWidth'
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
            </li>
            <li>
              <label htmlFor="email">Password</label>
              <input
                type='password'
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='outlined fullWidth'
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
            </li>
            <li>
              <label htmlFor="email">Confirm Password</label>
              <input
                type='password'
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='outlined fullWidth'
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
            </li>
            <Button onClick={(e) => registerHandler(userName, email, password, confirmPassword)} type="button" color="primary">Login</Button>
          </ul>
        </form>
        <p>Already have an account</p>
        <button onClick={(e) => setIsLogin(!isLogin)} type="button">Login</button>
      </>
      }
      </Container>
</Layout>
  )
}

export default Login
