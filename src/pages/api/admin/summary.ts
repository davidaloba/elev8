import nc from 'next-connect'
import Product from '../../../models/Product'
import User from '../../../models/User'
import { isAuth, isAdmin } from '../../../utils/auth'
import db from '../../../utils/db'
import { onError } from '../../../utils/error'

const handler = nc({
  onError
})
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const productsCount = await Product.countDocuments()
  const usersCount = await User.countDocuments()
  await db.disconnect()
  res.send({ productsCount, usersCount })
})

export default handler
