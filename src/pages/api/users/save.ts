import nc from 'next-connect'
import User from '../../../db/models/User'
import db from '../../../db'
import { signToken, isAuth } from '../../../utils/auth'

const handler = nc()
handler.use(isAuth)

handler.put(async (req, res) => {
  await db.connect()
  const user = await User.findOne({ userName: req.body.user })
  user.saves = [...user.saves, req.body.slug]
  await user.save()
  await db.disconnect()

  const token = signToken(user)
  res.send({
    token,
    saves: user.saves
  })
})

export default handler
