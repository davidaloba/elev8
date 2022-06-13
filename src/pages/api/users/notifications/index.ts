import nc from 'next-connect'
import { isAuth, signToken } from '@utils/auth'
import Notification from '@db/models/Notification'
import User from '@db/models/User'
import db from '@db'

const handler = nc()
handler.use(isAuth)

handler.get(async (req, res) => {
  await db.connect()

  const notifications = await Notification.find({})
  console.log(notifications)

  await db.disconnect()
  res.send(notifications)
})

handler.put(async (req, res) => {
  await db.connect()

  const user = await User.findOne({ email: req.body.email })
  user.profile.notifications = [...user.profile.notifications, req.body.slug]
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
})

export default handler
