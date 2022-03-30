import nc from 'next-connect'
import Post from '@db/models/Post'
import db from '@db'

const handler = nc()

handler.get(async (req, res) => {
  await db.connect()
  const post = await Post.findById(req.query.id)
  await db.disconnect()
  res.send(post)
})

export default handler
