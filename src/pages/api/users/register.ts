import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import User from '@db/models/User'
import db from '@db'
import { signToken } from '@utils/auth'

const handler = nc()

handler.post(async (req, res) => {
  await db.connect()

  const newUser = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
    userName: req.body.userName,
    profile: {
      dob: req.body.dob
    }
  })
  const user = await newUser.save()
  await db.disconnect()

  const token = signToken(user)
  res.send({
    token,
    email: user.email,
    isAdmin: user.isAdmin,
    userName: user.userName,
    profile: user.profile
  })
})

export default handler
