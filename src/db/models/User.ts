import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    biography: String
  },
  {
    timestamps: true
  }
)

export const Author = mongoose.models.Author || mongoose.model('Author', authorSchema)

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isAuthor: { type: Boolean, default: false, required: true },
    author: [authorSchema]
  },
  {
    timestamps: true
  }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
