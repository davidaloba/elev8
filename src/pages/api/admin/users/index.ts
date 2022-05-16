import nc from 'next-connect'
import { isAdmin, isAuth } from '@utils/auth'
import User from '@db/models/User'
import db from '@db'

const handler = nc()
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const users = await User.find({ isAdmin: false })
  await db.disconnect()
  res.send(users)
})

export default handler
