import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import User from '../../../db/models/User'
import db from '../../../db'
import { signToken, isAuth } from '../../../utils/auth'

const handler = nc()
handler.use(isAuth)

handler.put(async (req, res) => {
  await db.connect()
  console.log(req.body)

  const user = await User.findOne({ email: req.body.email })
  user.profile.firstName = req.body.firstName
  user.profile.lastName = req.body.lastName
  user.profile.avatar = req.body.avatar
  user.profile.phone = req.body.phone
  user.profile.dob = req.body.dob
  user.profile.facebook = req.body.facebook
  user.profile.instagram = req.body.instagram
  user.profile.twitter = req.body.twitter
  user.email = req.body.email
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password
  await user.save()
  await db.disconnect()
  console.log(user)
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
