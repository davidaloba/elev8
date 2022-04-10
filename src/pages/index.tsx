import { useAppSelector, useAppDispatch, AppState } from '@store'
import { } from '@store/actions'
import { fetchData } from '@utils/functions'

import {
  Layout,
  FeaturedPost,
  Intro,
  Posts,
  Container
} from '@components'

export const getServerSideProps = async ({ params }) => {
  const fetchData = async (url) => {
    const res = await fetch(url).then(
      (data) => data.json()
    )
    return res
  }

  const postsApi = 'http://localhost:3000/api/posts/'
  const posts = await fetchData(postsApi)

  return {
    props: { posts }
  }
}

const Home = ({ posts }) => {
  console.log(posts)
  const featuredPost = posts[0]
  const popularPosts = posts

  return (
      <Layout>
        <Container >
          <Intro />
        <FeaturedPost featuredPost={featuredPost}/>
        {popularPosts.length > 0 && <Posts posts={popularPosts} title='All Posts'/>}
        {/* <Pagination
          className={''}
          defaultPage={parseInt(query.page || '1')}
          count={pages}
          onChange={pageHandler}
        ></Pagination> */}
        </Container>
      </Layout>
  )
}

export default Home
