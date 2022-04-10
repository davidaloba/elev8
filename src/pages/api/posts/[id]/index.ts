import nc from 'next-connect'
import Post from '@db/models/Post'
import db from '@db'

const handler = nc()

handler.get(async (req, res) => {
  await db.connect()
  const post = await Post.findOne({ slug: req.query.id })
    .populate({
      path: 'authorProfile',
      select: 'authorProfile'
    })
  await db.disconnect()
  res.send(post)
  // console.log(post)
})

export default handler
