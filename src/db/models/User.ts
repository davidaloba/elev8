import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    dob: { type: String, required: false },
    phone: String,
    firstName: String,
    lastName: String,
    avatar: String,
    facebook: String,
    instagram: String,
    twitter: String,
    referrer: String,
    points: { type: Number, required: true, default: 0 },
    saves: { type: Array },
    tasks: { type: Array },
    paid: { type: Array }
  },
  {
    timestamps: true
  }
)

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    userName: { type: String, required: true, unique: true },
    referralCode: { type: String, required: true, unique: true },
    profile: profileSchema
  },
  {
    timestamps: true
  }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
