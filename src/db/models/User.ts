import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    biography: String
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
    isAuthor: { type: Boolean, default: false, required: true },
    authorProfile: profileSchema,
    saves: { type: Array, required: false }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
