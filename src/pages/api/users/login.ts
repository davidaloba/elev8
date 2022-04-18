import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import User from '@db/models/User'
import db from '@db'
import { signToken } from '@utils/auth'

const handler = nc()

handler.post(async (req, res) => {
  console.log(req.body)
  await db.connect()
  const user = await User.findOne({ email: req.body.email })
  await db.disconnect()
  console.log(user)
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user)
    res.send({
      token,
      userName: user.userName,
      email: user.email,
      saves: user.saves,
      isAdmin: user.isAdmin,
      isAuthor: user.isAuthor,
      authorProfile: user.authorProfile
    })
  } else {
    res.status(401).send({ message: 'Invalid email or password' })
  }
})

export default handler
