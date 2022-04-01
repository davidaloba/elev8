import { connect } from 'react-redux'
import { AppState, wrapper } from '@store'
import { TICK, FETCH_POSTS } from '@store/actions'
import {
  Layout,
  FeaturedPost,
  Intro,
  Posts,
  Container
} from '@components'

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
  store.dispatch(TICK('was dispatched'))
  // store.dispatch(FETCH_POSTS('/api/seed'))
  console.log('2. Page.getServerSideProps uses the store to dispatch things')

  return {
    props: {}
  }
})

const Home = (state:any, props:{}) => {
  const posts = state.posts.posts
  const featuredPost = posts[0]
  const popularPosts = posts

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
      </Layout>
  )
}

export default connect((state: AppState) => state)(Home)
