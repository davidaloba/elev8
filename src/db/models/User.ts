import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    avatar: String,
    phone: { type: String, required: true },
    dob: String,
    facebook: String,
    instagram: String,
    twitter: String
  },
  {
    timestamps: true
  }
)

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, required: true, default: false },
    points: { type: Number, required: false },
    saves: { type: Array, required: false },
    profile: profileSchema
  },
  {
    timestamps: true
  }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
