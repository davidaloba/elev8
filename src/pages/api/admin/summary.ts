import nc from 'next-connect'
import Post from '@db/models/Post'
import User from '@db/models/User'
import { isAuth, isAdmin } from '@utils/auth'
import db from '@db'
import { onError } from '@db/error'

const handler = nc({
  onError
})
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const postsCount = await Post.countDocuments()
  const usersCount = await User.countDocuments({ isAdmin: false })
  await db.disconnect()
  res.send({ postsCount, usersCount })
})

export default handler
