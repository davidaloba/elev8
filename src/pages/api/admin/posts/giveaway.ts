import nc from 'next-connect'
import { isAdmin, isAuth } from '@utils/auth'
import Post from '@db/models/Post'
import db from '@db'

const handler = nc()
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const posts = await Post.find({ 'data.link': 'giveaway' })
  await db.disconnect()
  res.send(posts)
})

handler.post(async (req, res) => {
  await db.connect()
  const newPost = new Post({
    type: req.body.type,
    slug: req.body.slug,
    title: req.body.title,
    body: req.body.body,
    data: {
      link: req.body.link,
      points: req.body.points,
      cost: req.body.cost
    }
  })

  const post = await newPost.save()
  await db.disconnect()
  res.send(post)
})

export default handler
