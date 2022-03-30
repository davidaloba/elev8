import nc from 'next-connect'
import { isAdmin, isAuth } from '@utils/auth'
import Post from '@db/models/Post'
import db from '@db'

const handler = nc()
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const posts = await Post.find({})
  await db.disconnect()
  res.send(posts)
})

handler.post(async (req, res) => {
  await db.connect()
  const newPost = new Post({
    name: 'sample name',
    slug: 'sample-slug-' + Math.random(),
    image: '/images/shirt1.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReviews: 0
  })

  const post = await newPost.save()
  await db.disconnect()
  res.send({ message: 'Post Created', post })
})

export default handler
