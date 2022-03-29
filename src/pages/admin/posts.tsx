import React, { useEffect, useContext, useReducer } from 'react'
import axios from 'axios'
import logger from 'logger-for-use-reducer'
import dynamic from 'next/dynamic'
import { getError } from '../../db/error'
import { Store } from '../../store/store'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Layout
} from '../../components'

function reducer (state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, posts: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true }
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true }
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false }
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false }
    default:
      state
  }
}

function AdminProdcuts () {
  const { state } = useContext(Store)
  const router = useRouter()
  const classes = useStyles()
  const { userInfo } = state

  const [
    { loading, error, posts, loadingCreate, successDelete, loadingDelete },
    dispatch
  ] = useReducer(logger(reducer), {
    loading: true,
    posts: [],
    error: ''
  })

  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get('/api/admin/posts', {
          headers: { authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' })
    } else {
      fetchData()
    }
  }, [successDelete])

  const { enqueueSnackbar } = useSnackbar()
  const deleteHandler = async (postId) => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' })
      await axios.delete(`/api/admin/posts/${postId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` }
      })
      dispatch({ type: 'DELETE_SUCCESS' })
      enqueueSnackbar('Post deleted successfully', { variant: 'success' })
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' })
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }
  return (
    <Layout title="Posts">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/posts" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Posts"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/users" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Users"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography component="h1" variant="h1">
                      Posts
                    </Typography>
                    {loadingDelete && <CircularProgress />}
                  </Grid>
                  <Grid align="right" item xs={6}>
                    <Button
                      onClick={createHandler}
                      color="primary"
                      variant="contained"
                    >
                      Create
                    </Button>
                    {loadingCreate && <CircularProgress />}
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                {loading
                  ? (
                  <CircularProgress />
                    )
                  : error
                    ? (
                  <Typography className={classes.error}>{error}</Typography>
                      )
                    : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>NAME</TableCell>
                          <TableCell>PRICE</TableCell>
                          <TableCell>CATEGORY</TableCell>
                          <TableCell>COUNT</TableCell>
                          <TableCell>LIKES</TableCell>
                          <TableCell>ACTIONS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {posts.map((post) => (
                          <TableRow key={post._id}>
                            <TableCell>
                              {post._id.substring(20, 24)}
                            </TableCell>
                            <TableCell>{post.name}</TableCell>
                            <TableCell>${post.price}</TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>{post.countInStock}</TableCell>
                            <TableCell>{post.likes}</TableCell>
                            <TableCell>
                              <NextLink
                                href={`/admin/post/${post._id}`}
                                passHref
                              >
                                <Button size="small" variant="contained">
                                  Edit
                                </Button>
                              </NextLink>{' '}
                              <Button
                                onClick={() => deleteHandler(post._id)}
                                size="small"
                                variant="contained"
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                      )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(AdminProdcuts), { ssr: false })
