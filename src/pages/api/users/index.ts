import nc from 'next-connect'
import User from '@db/models/User'
import db from '@db'

const handler = nc()

handler.get(async (req, res) => {
  await db.connect()
  const users = await User.find({})
  await db.disconnect()
  res.send(users)
})

export default handler
