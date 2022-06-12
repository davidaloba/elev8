import nc from 'next-connect'
import User from '../../../db/models/User'
import Post from '../../../db/models/Post'
import db from '../../../db'
import { signToken, isAuth } from '../../../utils/auth'

const handler = nc()
handler.use(isAuth)

handler.put(async (req, res) => {
  await db.connect()

  const giveaway = await Post.findOne({ slug: req.body.slug })
  const entry = {
    email: req.body.email,
    userName: req.body.userName,
    phone: req.body.phone,
    bankName: req.body.bankName,
    accountName: req.body.accountName,
    accountNo: req.body.accountNo
  }
  giveaway.data.giveawayEntries = [...giveaway.data.giveawayEntries, entry]
  await giveaway.save()
  console.log(giveaway)

  const user = await User.findOne({ email: req.body.email })
  user.profile.giveaway = [...user.profile.giveaway, req.body.slug]
  await user.save()
  console.log(user.profile.giveaway)

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

  // if (user.profile.points >= req.body.cost) {

  // } else {
  //   await db.disconnect()
  //   res.status(404).send({ message: 'You do not have sufficient points' })
  // }
})

export default handler
