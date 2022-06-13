import nc from 'next-connect'
import { isAdmin, isAuth } from '@utils/auth'
import Notification from '@db/models/Notification'
import db from '@db'

const handler = nc()
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const notification = await Notification.findById(req.query.id)
  await db.disconnect()
  res.send(notification)
})

handler.put(async (req, res) => {
  await db.connect()
  const notification = await Notification.findById(req.query.id)
  if (notification) {
    notification.name = req.body.name
    notification.slug = req.body.slug
    notification.price = req.body.price
    notification.categories = req.body.categories
    notification.image = req.body.image
    notification.featuredImage = req.body.featuredImage
    notification.isFeatured = req.body.isFeatured
    notification.brand = req.body.brand
    notification.countInStock = req.body.countInStock
    notification.description = req.body.description
    await notification.save()
    await db.disconnect()
    res.send({ message: 'Notification Updated Successfully' })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'Notification Not Found' })
  }
})

handler.delete(async (req, res) => {
  await db.connect()
  const notification = await Notification.findOne({ slug: req.query.id })
  if (notification) {
    await notification.remove()
    await db.disconnect()
    res.send({ message: 'Notification Deleted' })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'Notification Not Found' })
  }
})

export default handler
