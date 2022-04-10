import { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppState, useAppSelector, useAppDispatch } from '@store'
import { login } from '@store/actions'
import axios from 'axios'

import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import {
  Layout,
  Container,
  Header,
  Button
} from '@components'

// this should be on the login page. it adds the current logged in user data to store
// await dispatch(login('http://localhost:3000/api/profile?user=user'))

const Login = () => {
  const state = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { redirect } = router.query // login?redirect=/shipping
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const userInfo = state.user.data

  useEffect(() => {
    if (userInfo) {
      router.push('/profile')
    }
    // dummy code to populate state.user
    const userInfo = {
      token: '',
      userName: 'user',
      email: 'user@example.com',
      saves: ['from-server-side-rendering', 'lorem-ipsum-dolor-sit-amet', 'consectetur-adipiscing-elit', 'sed-do-eiusmod-tempor'],
      isAdmin: false,
      isAuthor: false,
      authorProfle: {}
    }
    dispatch(login(userInfo))
    console.log('2. Page.getServerSideProps dispatched actions')

    // router.push('/profile')
  }, [dispatch, router])

  const submitHandler = async ({ email, password }) => {
    try {
      const { user } = await axios.post('/api/users/login', {
        email,
        password
      })
      dispatch(login(user))
      console.log('2. Page.getServerSideProps dispatched actions')

      router.push(redirect || '/')
    } catch (err) {
    }
  }

  return (
    <Layout title="Login">
      <Container>
        <Header header='Blog' url='/' />
        <div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">Login</h1>
        </div>
        <>
          {/* <form onSubmit={handleSubmit(submitHandler)} className=''>
        <h1 component="h1" variant="h1">
          Login
        </h1>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
              }}
              render={({ field }) => (
                <h1
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></h1>
              )}
            ></Controller>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6
              }}
              render={({ field }) => (
                <h1
                  // variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></h1>
              )}
              ></Controller>
            <Button // variant="contained"
            type="submit"
            // fullWidth
            color="primary">
              Login
            </Button>
            Don&apos;t have an account? &nbsp;
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <h1>Register</h1>
            </NextLink>
      </form> */}
        </>
      </Container>
    </Layout>
  )
}

export default Login
