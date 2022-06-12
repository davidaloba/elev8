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
  const isTaskDone = user.profile.tasks.includes(req.body.task)

  if (isTaskDone === false) {
    user.profile.tasks = [...user.profile.tasks, req.body.task]
    user.profile.points += req.body.points
    await user.save()

    await db.disconnect()
    const token = signToken(user)
    res.send({
      token,
      email: user.email,
      isAdmin: user.isAdmin,
      userName: user.userName,
      profile: user.profile,
      referralCode: user.referral.referralCode
    })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'You have done this task already' })
  }
})

export default handler
