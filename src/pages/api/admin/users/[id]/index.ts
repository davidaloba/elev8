import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import { isAdmin, isAuth } from '@utils/auth'
import User from '@db/models/User'
import db from '@db'

const handler = nc()
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const user = await User.findOne({ email: req.query.id })
  await db.disconnect()
  res.send(user)
})

handler.put(async (req, res) => {
  await db.connect()
  const user = await User.findOne({ email: req.query.id })
  if (user) {
    user.password = req.body.password
      ? bcrypt.hashSync(req.body.password)
      : user.password
    user.profile.points += req.body.points
      ? parseInt(req.body.points)
      : 0
    await user.save()
    await db.disconnect()
    res.send({ message: 'Password Updated Successfully' })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'User Not Found' })
  }
})

handler.delete(async (req, res) => {
  await db.connect()
  const user = await User.findOne({ email: req.query.id })
  if (user) {
    await user.remove()
    await db.disconnect()
    res.send({ message: 'User Deleted' })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'User Not Found' })
  }
})

export default handler
