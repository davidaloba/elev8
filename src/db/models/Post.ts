import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    userName: String,
    comment: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const postSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  excerpt: { type: String, required: true },
  featuredImage: { type: String, required: true },
  categories: { type: String, default: 'uncategorized', required: true },
  isFeatured: { type: Boolean, required: true, default: false },
  saves: { type: Number, default: 0 },
  comments: [commentSchema]
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

postSchema.virtual('authorProfile', {
  ref: 'User', // in database Model `ref`
  localField: 'author', // Find doc(s) where `localField`
  foreignField: 'userName' // is equal to `foreignField`
})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
export default Post
