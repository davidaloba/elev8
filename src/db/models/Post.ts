import mongoose from 'mongoose'

const repliesSchema = new mongoose.Schema(
  {
    userName: String,
    comment: String,
    avatar: String
  },
  {
    timestamps: true
  }
)
const dataSchema = new mongoose.Schema(
  {
    link: { type: String, default: null },
    points: { type: Number, default: null },
    cost: { type: Number, default: null }
  },
  {
    timestamps: false
  }
)

const postSchema = new mongoose.Schema({
  type: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  data: dataSchema,
  replies: [repliesSchema]
},
{
  timestamps: true
}
)

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
export default Post
