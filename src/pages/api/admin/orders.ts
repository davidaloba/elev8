import nc from 'next-connect'
import Order from '../../../db/models/Order'
import { isAuth, isAdmin } from '../../../utils/auth'
import db from '../../../db'
import { onError } from '../../../db/error'

const handler = nc({
  onError
})
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const orders = await Order.find({}).populate('user', 'name')
  await db.disconnect()
  res.send(orders)
})

export default handler
