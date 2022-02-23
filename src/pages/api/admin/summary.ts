import nc from 'next-connect'
import Product from '../../../db/db/models/Product'
import User from '../../../db/models/User'
import { isAuth, isAdmin } from '../../../utils/auth'
import db from '../../../db'
import { onError } from '../../../db/error'

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
