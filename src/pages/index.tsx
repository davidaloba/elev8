import { connect } from 'react-redux'
import { wrapper, AppState } from '@store'
import { _tick, getPosts, getUsers } from '@store/actions'
import axios from 'axios'
import {
  Layout,
  FeaturedPost,
  Intro,
  Posts,
  Container
} from '@components'

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
  store.dispatch(_tick('was dispatched'))
  console.log('2. Page.getServerSideProps dispatched actions using store.dispatch')
  store.dispatch(getPosts('http://localhost:3000/api/posts'))

  return {
    props: {}
  }
})

const Home = (store: AppState, props:{}) => {
  const posts = store.posts.data
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

export default connect((store: AppState) => store)(Home)
