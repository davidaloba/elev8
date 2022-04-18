import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    name: String,
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
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
