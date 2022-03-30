import { useRouter } from 'next/router'

import db from '../db'
import Post from '../db/models/Post'
import data from '../db/_data'

import {
  Layout,
  FeaturedPost,
  Intro,
  Posts,
  Container
} from '../components'

export default function Home (props:{}) {
  // const { countPosts, categories, authors, pages, featuredPostDoc, popularPostsDocs } = props
  // const featuredPost = featuredPostDoc
  // const popularPosts = popularPostsDocs

  const posts = data.posts

  const featuredPost: {
    title: string,
    author: {
      name: string,
      avatar: string,
      biography: string
    },
    slug: string,
    body: string,
    excerpt: string,
    category: string,
    likes: number,
    comments: string[],
    description: string,
    featuredImage: string,
    isFeatured: boolean,
    date: string
  } = posts[0]

  const popularPosts: {
    title: string,
    author: {
      name: string,
      avatar: string,
      biography: string
    },
    slug: string,
    body: string,
    excerpt: string,
    category: string,
    likes: number,
    comments: string[],
    description: string,
    featuredImage: string,
    isFeatured: boolean,
    date: string
  }[] = posts

  const router = useRouter()
  const {
    query = 'all',
    category = 'all',
    author = 'all',
    likes = 'all',
    sort = 'featured'
  } = router.query
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

  return (
      <Layout>
        <Container >
          <Intro />
        <FeaturedPost featuredPost={featuredPost}/>
        {popularPosts.length > 0 && <Posts popularPosts={popularPosts} />}

        {/* <Pagination
          className={''}
          defaultPage={parseInt(query.page || '1')}
          count={pages}
          onChange={pageHandler}
        ></Pagination> */}

        </Container>

          {/* Search and Sort and Filter Controls
          <div>
                <Search item>
                  {posts.length === 0 ? 'No' : countPosts} Results
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
                    : null}
                </Search>
                <Sort item>
                    <Typography component="span" className={''}>
                      Sort by
                    </Typography>
                    <Select value={sort} onChange={sortHandler}>
                      <MenuItem value="featured">Featured</MenuItem>
                      <MenuItem value="popular">Most Liked</MenuItem>
                      <MenuItem value="newest">Newest Articles</MenuItem>
                    </Select>
                </Sort>
                <Categories>
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
                </Categories>
                <Authors>
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
                </Authors>
          </div>
          */}

      </Layout>
  )
}

export async function getServerSideProps () {
  await db.connect()
  const featuredPostDoc = await Post.find(
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
      featuredPostDoc: featuredPostDoc.map(db.convertDocToObj),
      popularPostsDocs: popularPostsDocs.map(db.convertDocToObj)
    }
  }
}
