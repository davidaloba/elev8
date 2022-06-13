import nc from 'next-connect'
import Post from '@db/models/Post'
import User from '@db/models/User'
import Notification from '@db/models/Notification'
import { isAuth, isAdmin } from '@utils/auth'
import db from '@db'
import { onError } from '@db/error'

const handler = nc({
  onError
})
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const postsCount = await Post.countDocuments()
  const notificationsCount = await Notification.countDocuments()
  const giveawayCount = await Post.countDocuments({ 'data.link': 'giveaway' })
  const usersCount = await User.countDocuments({ isAdmin: false })
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
  const withdrawalRequestsCount = withdrawalRequests.length
  await db.disconnect()

  res.send({ postsCount, usersCount, withdrawalRequestsCount, giveawayCount, notificationsCount })
})

export default handler
