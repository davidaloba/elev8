import nc from 'next-connect'
import { isAdmin, isAuth } from '@utils/auth'
import Notification from '@db/models/Notification'
import db from '@db'

const handler = nc()
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  await db.connect()
  const notifications = await Notification.find({})
  console.log(notifications)
  await db.disconnect()
  res.send(notifications)
})

handler.post(async (req, res) => {
  await db.connect()
  const newNotification = new Notification({
    slug: req.body.slug,
    title: req.body.title,
    body: req.body.body

  })

  const notification = await newNotification.save()
  await db.disconnect()
  res.send(notification)
})

export default handler
