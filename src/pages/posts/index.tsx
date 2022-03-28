/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link'
import { Grid, Link, Typography } from '@material-ui/core'
import Layout from '../components/Layout'
import db from '../db'
import Post from '../db/models/Post'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Store } from '../store'
import PostItem from '../components/PostItem'
import Carousel from 'react-material-ui-carousel'
import useStyles from '../styles/styles'

export default function Home (props) {
  const classes = useStyles()
  const router = useRouter()
  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    rating = 'all',
    sort = 'featured'
  } = router.query
  const { products, countProducts, categories, brands, pages } = props


  const filterSearch = ({
    page,
    category,
    author,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating
  }) => {
    const path = router.pathname
    const { query } = router
    if (page) query.page = page
    if (searchQuery) query.searchQuery = searchQuery
    if (sort) query.sort = sort
    if (category) query.category = category
    if (author) query.author = author
    if (price) query.price = price
    if (rating) query.rating = rating
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
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value })
  }
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value })
  }

  const { state, dispatch } = useContext(Store)

  const addToCartHandler = async (post) => {
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
    <Layout>
      <Typography variant="h2">Popular Posts</Typography>
       <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
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
              <Box className={classes.fullWidth}>
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
              <Box className={classes.fullWidth}>
                <Typography>Likes</Typography>
                <Select value={like} onChange={likeHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {likes.map((like) => (
                    <MenuItem dispaly="flex" key={like} value={like}>
                      <Like value={like} readOnly />
                      <Typography component="span">&amp; Up</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {posts.length === 0 ? 'No' : countPosts} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {author !== 'all' && ' : ' + author}
              {price !== 'all' && ' : Price ' + price}
              {like !== 'all' && ' : Like ' + like + ' & up'}
              {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              author !== 'all' ||
              like !== 'all' ||
              price !== 'all'
                ? (
                <Button onClick={() => router.push('/search')}>
                  <CancelIcon />
                </Button>
                  )
                : null}
            </Grid>
            <Grid item>
              <Typography component="span" className={classes.sort}>
                Sort by
              </Typography>
              <Select value={sort} onChange={sortHandler}>
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="lowest">Price: Low to High</MenuItem>
                <MenuItem value="highest">Price: High to Low</MenuItem>
                <MenuItem value="toprated">Customer Comments</MenuItem>
                <MenuItem value="newest">Newest Arrivals</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid className={classes.mt1} container spacing={3}>
            {posts.map((post) => (
              <Grid item md={4} key={post.name}>
                <PostItem
                  post={post}
                  addToCartHandler={addToCartHandler}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            className={classes.mt1}
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
      like: -1
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
