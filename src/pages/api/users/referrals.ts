import nc from 'next-connect'
import User from '@db/models/User'
import db from '@db'
import { isAuth } from '@utils/auth'

const handler = nc(isAuth)

handler.get(async (req, res) => {
  await db.connect()
  const user = await User.findOne({ email: req.query.email })

  // const referralCode = req.query.referralCode
  // const referrals = await User.find({ admin: false, 'referral.referrer': referralCode })
  // const referralsNo = await User.find({ admin: false, 'referral.referrer': referralCode }).countDocuments()
  // const totalEarnings = referralsNo * 1500

  const withdrawals = user.referral.withdrawals.sort((a, b) => b.createdAt - a.createdAt)
  const totalWithdrawals = user.referral.totalWithdrawals
  const totalEarnings = user.referral.referralBonus
  const balance = totalEarnings - totalWithdrawals

  await db.disconnect()
  res.send({
    withdrawals,
    totalEarnings,
    totalWithdrawals,
    balance
  })
})

handler.put(async (req, res) => {
  await db.connect()
  const user = await User.findOne({ email: req.body.email })
  const request = {
    withdrawalId: `${req.body.userName}-${Date.now()}-${req.body.amount}`,
    bankName: req.body.bankName,
    accountName: req.body.accountName,
    accountNo: req.body.accountNo,
    amount: req.body.amount
  }

  user.referral.withdrawals = [...user.referral.withdrawals, request]
  user.referral.totalWithdrawals += req.body.amount
  await user.save()

  await db.disconnect()
  res.send({ message: 'withrawal balance deducted' })
})

export default handler
