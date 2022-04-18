import { useEffect } from 'react'
import { useAppSelector, useAppDispatch, AppState } from '@store'
import { fetchPosts, fetchSaved, _user } from '@store/actions'
import axios from 'axios'

import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
  Layout,
  Header,
  Container,
  Posts
} from '@components'

const Profile = () => {
  const state = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm()

  const userInfo = state.user.data

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login')
    }
    console.log(userInfo)
    setValue('userName', userInfo.userName)
    setValue('email', userInfo.email)

    async function fetchPosts () {
      // You can await here
      const postsApi = 'http://localhost:3000/api/posts/'
      const posts = await fetch(postsApi).then(
        (data) => data.json()
      )
      dispatch(setPosts(posts))
      // ...
    }
    fetchPosts()

    const saves = userInfo.saves
    const posts = state.posts.all
    dispatch(fetchSaved({ saves, posts }))
  },
  [dispatch, router, setValue, userInfo])

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    // closeSnackbar()
    if (password !== confirmPassword) {
      // enqueueSnackbar('Passwords don\'t match', { variant: 'error' })
      return
    }
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      )
      dispatch({ type: 'USER_LOGIN', payload: data })
      // Cookies.set('userInfo', data)

      // enqueueSnackbar('Profile updated successfully', { variant: 'success' })
    } catch (err) {
      // enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }

  // if (error) return <div>Failed to load</div>
  // if (!user) return <div>Loading...</div>
  return (
    <Layout title="Profile">
      <Container>
        <>
        <Header header='Blog' url='/'/>

        <div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">Profile</h1>
        </div>

        <div>
          <h1>userName:</h1>
          <h1>email:</h1>
        </div>
        </>

        <>
          {/* <form
            onSubmit={handleSubmit(submitHandler)}
          >
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2
                  }}
                  render={({ field }) => (
                    <h1
                      // variant="outlined"
                      // fullWidth
                      id="name"
                      // label="Name"
                      inputProps={{ type: 'name' }}
                      error={Boolean(errors.name)}
                      helperText={
                        errors.name
                          ? errors.name.type === 'minLength'
                            ? 'Name length is more than 1'
                            : 'Name is required'
                          : ''
                      }
                      {...field}
                    >Name</h1>
                  )}
                ></Controller>
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
                      // variant="outlined"
                      // fullWidth
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
                    >Email</h1>
                  )}
                  ></Controller>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    validate: (value) =>
                      value === '' ||
                      value.length > 5 ||
                      'Password length is more than 5'
                  }}
                  render={({ field }) => (
                    <h1
                      // variant="outlined"
                      // fullWidth
                      id="password"
                      label="Password"
                      inputProps={{ type: 'password' }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? 'Password length is more than 5'
                          : ''
                      }
                      {...field}
                    >Password</h1>
                  )}
                ></Controller>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    validate: (value) =>
                      value === '' ||
                      value.length > 5 ||
                      'Confirm Password length is more than 5'
                  }}
                  render={({ field }) => (
                    <h1
                      // variant="outlined"
                      // fullWidth
                      id="confirmPassword"
                      label="Confirm Password"
                      inputProps={{ type: 'password' }}
                      error={Boolean(errors.confirmPassword)}
                      helperText={
                        errors.password
                          ? 'Confirm Password length is more than 5'
                          : ''
                      }
                      {...field}
                    >Password</h1>
                  )}
                ></Controller>
                <Button
                  // variant="contained"
                  type="submit"
                  // fullWidth
                  color="primary"
                >
                  Update
                </Button>
          </form> */}
        </>

        <hr className="border-accent-2 mt-28 mb-24" />

        {/* saved.length > 0 && <Posts posts={saved} title='Saved Posts' /> */}
      </Container>
    </Layout>
  )
}

export default Profile
