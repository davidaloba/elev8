import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import User from '../../../db/models/User'
import db from '../../../db'
import { signToken, isAuth } from '../../../utils/auth'

const handler = nc()
handler.use(isAuth)

handler.put(async (req, res) => {
  await db.connect()
  const user = await User.findOne({ email: req.body.email })

  if (user.profile.points >= req.body.cost) {
    user.profile.paid = [...user.profile.paid, req.body.paid]
    user.profile.points -= req.body.cost
    await user.save()

    await db.disconnect()
    const token = signToken(user)
    res.send({
      token,
      email: user.email,
      isAdmin: user.isAdmin,
      userName: user.userName,
      profile: user.profile
    })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'You do not have sufficient points' })
  }
})

export default handler
