import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import User from '@db/models/User'
import db from '@db'
import { signToken } from '@utils/auth'

const handler = nc()

handler.post(async (req, res) => {
  await db.connect()
  console.log(req.body)
  const user = await User.findOne({ email: req.body.email })
  console.log(user)
  await db.disconnect()
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user)
    res.send({
      token,
      email: user.email,
      isAdmin: user.isAdmin,
      userName: user.userName,
      profile: user.profile
    })
  } else {
    res.status(401).send({ message: 'Invalid email or password' })
  }
})

export default handler
