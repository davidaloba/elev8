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
    link: String,
    points: Number,
    cost: Number
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
  image: { type: String },
  replies: [repliesSchema],
  data: dataSchema
},
{
  timestamps: true
}
)

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
export default Post
