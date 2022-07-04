import nc from 'next-connect'
import Post from '@db/models/Post'
import db from '@db'

const handler = nc()

handler.get(async (req, res) => {
  await db.connect()
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = page !== 0 ? (page - 1) * limit : 0

  const posts = await Post.find()
  const pages = Math.ceil(posts.length / limit)

  const paginatedPosts = await Post.find({}).sort('-createdAt').skip(startIndex).limit(limit)
  await db.disconnect()
  res.send({ posts: paginatedPosts, pages })
})

export default handler
