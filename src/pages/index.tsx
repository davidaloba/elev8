import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@store'
import { fetchPosts } from '@store/actions'

import {
  Layout,
  Header,
  Intro,
  Posts,
  Container
} from '@components'

const Home = (props) => {
  const router = useRouter()
  const { user, posts } = useAppSelector((state) => state)

  useEffect(() => {
    if (!user.userInfo) {
      return router.push('/login')
    }
    const postsApi = 'http://localhost:3000/api/posts/'
    fetchPosts(postsApi)
  }, [])

  console.log(posts)
  console.log(user)

  if (posts.loading) {
    return <div className='loading'></div>
  }
  return (
      <Layout>
        <Container >
        <Intro />
        <Header header='Blog' url='/' />
        {posts.length > 0 && <Posts posts={posts} title='All Posts'/>}
        </Container>
      </Layout>
  )
}

export default Home
