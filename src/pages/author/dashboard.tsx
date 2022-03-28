import axios from 'axios'
import logger from 'logger-for-use-reducer'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import React, { useEffect, useContext, useReducer } from 'react'
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  CardContent,
  CardActions
} from '@material-ui/core'
import { Bar } from 'react-chartjs-2'
import { getError } from '../../db/error'
import { Store } from '../../store'
import Layout from '../../components/Layout'
import useStyles from '../../styles/styles'

function reducer (state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      state
  }
}

function AuthorDashboard () {
  const { state } = useContext(Store)
  const router = useRouter()
  const classes = useStyles()
  const { userInfo } = state

  const [{ loading, error, summary }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    summary: { salesData: [] },
    error: ''
  })

  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get('/api/author/summary', {
          headers: { authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [])
  return (
    <Layout title="Author Dashboard">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/author/dashboard" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Author Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/author/posts" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Posts"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
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
                  <Grid container spacing={5}>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.postsCount}
                          </Typography>
                          <Typography>Posts</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/author/posts" passHref>
                            <Button size="small" color="primary">
                              View posts
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                      )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(AuthorDashboard), { ssr: false })
