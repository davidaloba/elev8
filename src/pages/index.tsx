import React from 'react'
import { connect } from 'react-redux'
import { IState, wrapper } from '@store/redux'

import {
  Layout,
  FeaturedPost,
  Intro,
  Posts,
  Container
} from '@components'

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
  // await store.dispatch({ type: 'TICK', payload: 'was set in other page' })
  console.log('2. Page.getServerSideProps uses the store to dispatch things')

  return {
    props: {}
  }
})

const Home = (state:any, props:{}) => {
  console.log(state.tick)

  const posts = state.posts
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

export default connect((state: IState) => state.posts)(Home)
