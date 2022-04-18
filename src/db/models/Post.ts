import mongoose from 'mongoose'

const repliesSchema = new mongoose.Schema(
  {
    userName: String,
    comment: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const postSchema = new mongoose.Schema({
  type: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String },
  points: { type: Number },
  replies: [repliesSchema]
},
{
  timestamps: true
}
)

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
export default Post
