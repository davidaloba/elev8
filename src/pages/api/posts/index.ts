import nc from 'next-connect'
import Post from '@db/models/Post'
import User from '@db/models/User'
import db from '@db'

// import mongoose from 'mongoose'
// console.log(mongoose.models.User)

const handler = nc()

handler.get(async (req, res) => {
  await db.connect()
  const posts = await Post.find({})
  await db.disconnect()
  res.send(posts)
})

export default handler
