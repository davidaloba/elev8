import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import User from '../../../db/models/User'
import db from '../../../db'
import { signToken } from '../../../utils/auth'

const handler = nc()

handler.post(async (req, res) => {
  await db.connect()
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false
  })
  const user = await newUser.save()
  console.log(user)
  await db.disconnect()

  const token = signToken(user)
  console.log(token)
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  })
})

export default handler
