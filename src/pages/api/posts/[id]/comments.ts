// /api/posts/:id/comments
import mongoose from 'mongoose'
import nextConnect from 'next-connect'
import { onError } from '@db/error'
import db from '@db'
import Post from '@db/models/Post'
import { isAuth } from '@utils/auth'

const handler = nextConnect({ onError })

handler.get(async (req, res) => {
  db.connect()
  const post = await Post.findById(req.query.id)
  db.disconnect()
  if (post) {
    res.send(post.comments)
  } else {
    res.status(404).send({ message: 'Post not found' })
  }
})

handler.use(isAuth).post(async (req, res) => {
  await db.connect()
  const post = await Post.findById(req.query.id)
  if (post) {
    const existComment = post.comments.find((x) => x.user === req.user._id)
    if (existComment) {
      await Post.updateOne(
        { _id: req.query.id, 'comments._id': existComment._id },
        {
          $set: {
            'comments.$.comment': req.body.comment,
            'comments.$.likes': Number(req.body.likes)
          }
        }
      )

      const updatedPost = await Post.findById(req.query.id)
      updatedPost.numComments = updatedPost.comments.length
      updatedPost.likes =
        updatedPost.comments.reduce((a, c) => c.likes + a, 0) /
        updatedPost.comments.length
      await updatedPost.save()

      await db.disconnect()
      return res.send({ message: 'Comment updated' })
    } else {
      const comment = {
        user: mongoose.Types.ObjectId(req.user._id),
        name: req.user.name,
        likes: Number(req.body.likes),
        comment: req.body.comment
      }
      post.comments.push(comment)
      post.numComments = post.comments.length
      post.likes =
        post.comments.reduce((a, c) => c.likes + a, 0) /
        post.comments.length
      await post.save()
      await db.disconnect()
      res.status(201).send({
        message: 'Comment submitted'
      })
    }
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'Post Not Found' })
  }
})

export default handler
