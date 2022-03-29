/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import db from '../db'
import Post from '../db/models/Post'
import axios from 'axios'
import store from '../store'

import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
  Layout,
  PostItem,
  Pagination
} from '../components'

export default function Home (props) {
  const router = useRouter()
  const {
    query = 'all',
    category = 'all',
    author = 'all',
    likes = 'all',
    sort = 'featured'
  } = router.query
  const { posts, countPosts, categories, authors, pages } = props

  const filterSearch = ({
    page,
    category,
    author,
    sort,
    min,
    max,
    searchQuery,
    likes
  }) => {
    const path = router.pathname
    const { query } = router
    if (page) query.page = page
    if (searchQuery) query.searchQuery = searchQuery
    if (sort) query.sort = sort
    if (category) query.category = category
    if (author) query.author = author
    if (likes) query.likes = likes
    if (min) query.min ? query.min : query.min === 0 ? 0 : min
    if (max) query.max ? query.max : query.max === 0 ? 0 : max

    router.push({
      pathname: path,
      query: query
    })
  }
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value })
  }

  const pageHandler = (e, page) => {
    filterSearch({ page })
  }
  const authorHandler = (e) => {
    filterSearch({ author: e.target.value })
  }
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value })
  }
  const likesHandler = (e) => {
    filterSearch({ likes: e.target.value })
  }

  const dispatch = useDispatch()

  const likeHandler = async (post) => {
    dispatch({ type: 'LIKE', payload: { ...post } })
  }

  return (
    <Layout>
      <Typography variant="h2">Popular Posts</Typography>
      <Grid className={''} container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box className={''}>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={''}>
                <Typography>Authors</Typography>
                <Select value={author} onChange={authorHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {authors &&
                    authors.map((author) => (
                      <MenuItem key={author} value={author}>
                        {author}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={''}>
                <Typography>likes</Typography>
                <Select value={likes} onChange={likesHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem display="flex" key={likes} value={likes}>
                    <List value={likes} readOnly />
                    <Typography component="span">&amp; Up</Typography>
                  </MenuItem>
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {/* {posts.length === 0 ? 'No' : countPosts} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {author !== 'all' && ' : ' + author}
              {likes !== 'all' && ' : likes ' + likes + ' & up'}
              {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              author !== 'all' ||
              likes !== 'all'
                ? (
                <Button onClick={() => router.push('/search')}>
                  <CancelIcon />
                </Button>
                  )
                : null} */}
            </Grid>
            <Grid item>
              <Typography component="span" className={''}>
                Sort by
              </Typography>
              <Select value={sort} onChange={sortHandler}>
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="toprated">Customer Comments</MenuItem>
                <MenuItem value="newest">Newest Arrivals</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid className={''} container spacing={3}>
            {/* {posts.map((post) => (
              <Grid item md={4} key={post.name}>
                <PostItem
                  post={post}
                  likeHandler={likeHandler}
                />
              </Grid>
            ))} */}
          </Grid>
          <Pagination
            className={''}
            defaultPage={parseInt(query.page || '1')}
            count={pages}
            onChange={pageHandler}

          ></Pagination>
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps () {
  await db.connect()
  const featuredPostsDocs = await Post.find(
    { isFeatured: true },
    '-comments'
  )
    .lean()
    .limit(3)
  const popularPostsDocs = await Post.find({}, '-comments')
    .lean()
    .sort({
      likes: -1
    })
    .limit(6)
  await db.disconnect()
  return {
    props: {
      featuredPosts: featuredPostsDocs.map(db.convertDocToObj),
      topRatedPosts: popularPostsDocs.map(db.convertDocToObj)
    }
  }
}
