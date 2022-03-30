import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@store/reducers'
import { useAppDispatch } from '@store/store'
import { FETCH_POSTS, FETCH_USERS } from '@store/actions'

import {
  Layout,
  FeaturedPost,
  Intro,
  Posts,
  Container
} from '@components'

export default function Home (props) {
  const dispatch = useAppDispatch()

  const posts = useSelector((state: RootState) => state.posts.posts)

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

export async function getServerSideProps () {
  return {
    props: {
      // featuredPost,
      // popularPosts
    }
  }
}
