import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { RootState, useAppSelector, useAppDispatch } from '@store'
import { login } from '@store/actions'
import { getError } from '@db/error'
import Cookies from 'js-cookie'
import axios from 'axios'

import {
  Container,
  Button,
  Intro,
  Footer
} from '@components'

const Login = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (userInfo) {
      router.push('/app')
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
    console.log(email, password)
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
  }

  const registerHandler = async () => {
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match')
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        userName,
        email,
        password,
        dob
      })
      dispatch(login(data))
      Cookies.set('userInfo', data)
      console.log(data)
      router.push('/app')
    } catch (err) {
      alert(getError(err))
    }
  }

  return (
    <>
      <Container>
        <Intro header='Login' url='/' />
        {
          isLogin
            ? <>
              <hr className="border-accent-2 mt-28 mb-24" />
              <h1>Login</h1>
              <form className=''>
                <div>
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
                </div>
                <div>
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
                </div>
                <Button onClick={(e) => loginHandler(email, password)} type="button" color="primary">Login</Button>
              </form>
              <p>Don't have an account?</p>
              <button onClick={(e) => setIsLogin(!isLogin)}>Register</button>
            </>
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
                </div>
                <div>
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
                </div>
                <div>
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
                </div>
                <div>
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
                </div>
                <div>
                  <label htmlFor="email">Date of Birth</label>
                  <input
                    type='date'
                    name="dob"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
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
                </div>
                <div>
                  <Button onClick={registerHandler} type="button" color="primary">Sign up</Button>
                </div>
              </form>
              <p>Already have an account</p>
              <button onClick={(e) => setIsLogin(!isLogin)} type="button">Login</button>
            </>
        }
        <Footer />
      </Container>
    </>
  )
}

export default Login
