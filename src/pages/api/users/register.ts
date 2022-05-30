import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import shortid from 'shortid'
import User from '@db/models/User'
import db from '@db'
import { signToken } from '@utils/auth'

const handler = nc()

handler.post(async (req, res) => {
  await db.connect()

  const referralCode = shortid.generate()
  const newUser = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    userName: req.body.userName,
    isAdmin: false,
    referral: {
      referralCode: referralCode,
      ...(req.body.referrer === '')
        ? { referrer: 'elev8Admin' }
        : { referrer: 'req.body.referrer' }
    }
  })
  const user = await newUser.save()
  console.log(user)

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
