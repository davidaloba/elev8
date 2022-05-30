import nc from 'next-connect'
import Post from '@db/models/Post'
import User from '@db/models/User'
import { isAuth, isAdmin } from '@utils/auth'
import db from '@db'
import { onError } from '@db/error'

const handler = nc({
  onError
})
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const withdrawalRequests = await User.aggregate([
    { $match: { isAdmin: false } },
    { $unwind: '$referral.withdrawals' },
    { $match: { 'referral.withdrawals.status': 'pending' } },
    {
      $project: {
        _id: 0,
        userName: 1,
        withdrawalId: '$referral.withdrawals.withdrawalId',
        bankName: '$referral.withdrawals.bankName',
        accountName: '$referral.withdrawals.accountName',
        accountNo: '$referral.withdrawals.accountNo',
        amount: '$referral.withdrawals.amount',
        status: '$referral.withdrawals.status'
      }
    }
  ])
  await db.disconnect()

  res.send({ ...withdrawalRequests })
})

handler.put(async (req, res) => {
  await db.connect()

  const user = await User.findOne({ userName: req.body.userName })
  const withdrawalRequest = user.referral.withdrawals
    .find((withdrawal) => withdrawal.withdrawalId === req.body.withdrawalId)

  withdrawalRequest.status = req.query.status
  if (req.query.status === 'rejected') user.referral.totalWithdrawals -= req.body.amount

  await user.save()
  await db.disconnect()
  res.send({ withdrawalRequest })
})

export default handler
