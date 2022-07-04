import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import shortid from 'shortid'
import User from '@db/models/User'
import db from '@db'
import { signToken } from '@utils/auth'

const handler = nc()

handler.post(async (req, res) => {
  await db.connect()

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    userName: req.body.userName,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
    referral: {
      referralCode: shortid.generate(),
      ...(req.body.referrer === '')
        ? { referrer: 'elev8Admin' }
        : { referrer: req.body.referrer }
    }
  })
  const user = await newUser.save()

  const referrer = await User.findOne({ 'referral.referralCode': req.body.referrer })
  referrer.referral.referralBonus += 3000
  referrer.save()

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
