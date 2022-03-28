import React, { useContext, useEffect, useState } from 'react'
import Post from '../db/models/Post'
import db from '../../db'
import axios from 'axios'
import { Store } from '../../store'
import { getError } from '../../db/error'
import { useRouter } from 'next/router'

import NextLink from 'next/link'
import Image from 'next/image'
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  TextField,
  CircularProgress,
  Like,
  Layout
} from '../../components'


export default function PostScreen (props) {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const { post } = props
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const [comments, setComments] = useState([])
  const [like, setLike] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(
        `/api/posts/${post._id}/comments`,
        {
          like,
          comment
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` }
        }
      )
      setLoading(false)
      enqueueSnackbar('Comment submitted successfully', { variant: 'success' })
      fetchComments()
    } catch (err) {
      setLoading(false)
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/posts/${post._id}/comments`)
      setComments(data)
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }
  useEffect(() => {
    fetchComments()
  }, [])

  if (!post) {
    return <div>Post Not Found</div>
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === post._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/posts/${post._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry. Post is out of stock')
      return
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...post, quantity } })
    router.push('/cart')
  }

  return (
    <Layout title={post.name} description={post.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>back to posts</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={post.image}
            alt={post.name}
            width={640}
            height={640}
            Layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {post.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {post.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Author: {post.author}</Typography>
            </ListItem>
            <ListItem>
              <Like value={post.like} readOnly></Like>
              <Link href="#comments">
                <Typography>({post.numComments} comments)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography> Description: {post.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${post.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {post.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <List>
        <ListItem>
          <Typography name="comments" id="comments" variant="h2">
            Customer Comments
          </Typography>
        </ListItem>
        {comments.length === 0 && <ListItem>No comment</ListItem>}
        {comments.map((comment) => (
          <ListItem key={comment._id}>
            <Grid container>
              <Grid item className={classes.commentItem}>
                <Typography>
                  <strong>{comment.name}</strong>
                </Typography>
                <Typography>{comment.createdAt.substring(0, 10)}</Typography>
              </Grid>
              <Grid item>
                <Like value={comment.like} readOnly></Like>
                <Typography>{comment.comment}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <ListItem>
          {userInfo
            ? (
            <form onSubmit={submitHandler} className={classes.commentForm}>
              <List>
                <ListItem>
                  <Typography variant="h2">Leave your comment</Typography>
                </ListItem>
                <ListItem>
                  <TextField
                    multiline
                    variant="outlined"
                    fullWidth
                    name="comment"
                    label="Enter comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Like
                    name="simple-controlled"
                    value={like}
                    onChange={(e) => setLike(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>

                  {loading && <CircularProgress></CircularProgress>}
                </ListItem>
              </List>
            </form>
              )
            : (
            <Typography variant="h2">
              Please{' '}
              <Link href={`/login?redirect=/post/${post.slug}`}>
                login
              </Link>{' '}
              to write a comment
            </Typography>
              )}
        </ListItem>
      </List>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const { params } = context
  const { slug } = params

  await db.connect()
  const post = await Post.findOne({ slug }, '-comments').lean()
  await db.disconnect()
  return {
    props: {
      post: db.convertDocToObj(post)
    }
  }
}
