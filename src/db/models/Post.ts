import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  excerpt: { type: String, required: true },
  category: { type: String, required: false },
  likes: { type: Number, default: 0 },
  comments: [commentSchema],
  featuredImage: { type: String, required: true },
  isFeatured: { type: Boolean, required: true, default: false }
},
{
  timestamps: true
}
)

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
export default Post
