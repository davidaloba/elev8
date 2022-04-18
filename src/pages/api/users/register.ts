import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import User from '@db/models/User'
import db from '@db'
import { signToken } from '@utils/auth'

const handler = nc()

handler.post(async (req, res) => {
  await db.connect()
  const newUser = new User({
    userName: req.body.userName,
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
    userName: user.userName,
    email: user.email,
    saves: user.saves,
    isAdmin: user.isAdmin,
    isAuthor: user.isAuthor,
    authorProfile: user.authorProfile
  })
})

export default handler
