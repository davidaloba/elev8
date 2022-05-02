import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import User from '@db/models/User'
import db from '@db'
import { signToken } from '@utils/auth'

const handler = nc()

handler.post(async (req, res) => {
  await db.connect()
  const user = await User.findOne({ email: req.body.email })
  await db.disconnect()
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.send({
      token,
      email: user.email,
      isAdmin: user.isAdmin,
      userName: user.userName,
      profile: user.profile
    })
    const token = signToken(user)
  } else {
    res.status(401).send({ message: 'Invalid email or password' })
  }
})

export default handler
