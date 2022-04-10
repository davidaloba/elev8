import { useAppSelector, useAppDispatch, AppState } from '@store'
import { } from '@store/actions'
import { fetchData } from '@utils/functions'

import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Layout, Container, Header, Posts, Avatar } from '@components'

export const getServerSideProps = async ({ params }) => {
  const postApi = `http://localhost:3000/api/posts/${params.slug}`
  const post = await fetchData(postApi)

  const postsApi = 'http://localhost:3000/api/posts/'
  const posts = await fetchData(postsApi)

  if (!post) {
    return {
      notFound: true
    }
  }
  return {
    props: { post, posts }
  }
}

const Post = ({ post, posts }) => {
  const router = useRouter()

  const author = post.authorProfile[0].authorProfile
  const morePosts = posts.slice(0, 2)

  const saveHandler = async () => {
  }

  if (!post) {
    return <Container>
      <div>Post Not Found</div>
    </Container>
  }
  return (
    <Layout>
      <Container>
        <Header header='Blog' url='/' />
        {router.isFallback
          ? (
            <div>Loading…</div>
            )
          : (
            <>
              <article>
                <Head>
                  <title>
                    {post.title}
                  </title>
                  <meta
                    property="og:image"
                    content={post.featuredImage?.sourceUrl}
                  />
                </Head>

                <section>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">{post.title}</h1>
                  <div className="hidden md:block md:mb-12">
                    <Avatar author={author} />
                  </div>
                  <div className="mb-8 md:mb-16 sm:mx-0">
                    <Image src={post.featuredImage} alt="" title={post.title} layout="responsive" sizes="100%" width='100%' height='50%' />
                  </div>
                  <div className="max-w-2xl mx-auto">
                    <div className="block md:hidden mb-6">
                      <Avatar author={author} />
                    </div>
                    <div className="mb-6 text-lg">Posted  {post.createdAt} Under {post.categories} </div>
                  </div>
                </section>

                <section className="max-w-2xl mx-auto">
                  <div
                    dangerouslySetInnerHTML={{ __html: post.body }}
                  />
                </section>

                {/* <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer> */}
              </article>

              <hr className="border-accent-2 mt-28 mb-24" />
              {morePosts.length > 0 && <Posts posts={morePosts} title='Similar Posts' />}
            </>
            )}
      </Container>
    </Layout>
  )
}
export default Post
// export default connect((store: AppState) => store)(Post)

// export const getStaticPaths = async () => {
//   const posts = await fetch('http://localhost:3000/api/posts')
//     .then((data) => data.json())
//   const postsSlugs: [] = [] // an array of the slugs of all posts

//   return {
//     paths: postsSlugs.map(({ slug }) => `/posts/${slug}`) || [],
//     fallback: true
//   }
// }
