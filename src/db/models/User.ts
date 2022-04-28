import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    dob: { type: String, required: true },
    points: { type: Number, required: false, default: 0 },
    phone: String,
    firstName: String,
    lastName: String,
    avatar: String,
    facebook: String,
    instagram: String,
    twitter: String,
    saves: [{ type: String, unique: true }],
    tasks: [{ type: String, unique: true }],
    paid: [{ type: String, unique: true }]
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
    profile: profileSchema
  },
  {
    timestamps: true
  }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
