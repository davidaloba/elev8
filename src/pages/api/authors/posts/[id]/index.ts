import nc from 'next-connect'
import { isAuthor, isAuth } from '../../../../../utils/auth'
import Post from '../../../../../db/models/Post'
import db from '../../../../../db'

const handler = nc()
handler.use(isAuth, isAuthor)

handler.get(async (req, res) => {
  await db.connect()
  const post = await Post.findById(req.query.id)
  await db.disconnect()
  res.send(post)
})

handler.put(async (req, res) => {
  await db.connect()
  const post = await Post.findById(req.query.id)
  if (post) {
    post.name = req.body.name
    post.slug = req.body.slug
    post.price = req.body.price
    post.category = req.body.category
    post.image = req.body.image
    post.featuredImage = req.body.featuredImage
    post.isFeatured = req.body.isFeatured
    post.brand = req.body.brand
    post.countInStock = req.body.countInStock
    post.description = req.body.description
    await post.save()
    await db.disconnect()
    res.send({ message: 'Post Updated Successfully' })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'Post Not Found' })
  }
})

handler.delete(async (req, res) => {
  await db.connect()
  const post = await Post.findById(req.query.id)
  if (post) {
    await post.remove()
    await db.disconnect()
    res.send({ message: 'Post Deleted' })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'Post Not Found' })
  }
})

export default handler
