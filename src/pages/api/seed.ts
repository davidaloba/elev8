import nc from 'next-connect'
import User from '../../db/models/User'
import Post from '../../db/models/Post'
import db from '../../db'
import data from '../../db/data'

const handler = nc()

handler.get(async (req, res) => {
  // return res.send({ message: 'already seeded' });
  await db.connect()
  await User.deleteMany()
  await User.insertMany(data.users)
  await Post.deleteMany()
  await Post.insertMany(data.posts)
  await db.disconnect()
  res.send({ message: 'seeded successfully' })
})

export default handler
