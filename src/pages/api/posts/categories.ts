import nc from 'next-connect'
import Post from '../../../db/models/Post'
import db from '../../../db'

const handler = nc()

handler.get(async (req, res) => {
  await db.connect()
  const categories = await Post.find().distinct('category')
  await db.disconnect()
  res.send(categories)
})

export default handler
