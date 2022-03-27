import nc from 'next-connect'
import Product from '../../db/models/Product'
import db from '../../db'
import data from '../../db/data'
import User from '../../db/models/User'

const handler = nc()

handler.get(async (req, res) => {
  // return res.send({ message: 'already seeded' });
  await db.connect()
  await User.deleteMany()
  await User.insertMany(data.users)
  await Product.deleteMany()
  await Product.insertMany(data.products)
  await db.disconnect()
  res.send({ message: 'seeded successfully' })
})

export default handler
