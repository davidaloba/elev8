import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  body: { type: String, required: true }
},
{
  timestamps: true
}
)

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)
export default Notification
