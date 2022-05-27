import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import shortid from 'shortid'
import User from '@db/models/User'
import db from '@db'
import { signToken } from '@utils/auth'

const handler = nc()
const Flutterwave = require('flutterwave-node-v3')
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY)

handler.post(async (req, res) => {
  await db.connect()

  flw.Transaction.verify({ id: req.body.transactionId })
    .then((response) => {
      if (
        response.data.status === 'successful' &&
        response.data.amount === 4000 &&
        response.data.currency === 'NGN') {
        // Success! Confirm the customer's payment
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
        // Inform the customer their payment was unsuccessful
        await db.disconnect()
        res.status(404).send({ message: 'Your payment was unseccesful. Please try again later' })
      }
    })
    .catch(console.log)
})

export default handler
