import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import User from '../../../db/models/User'
import db from '../../../db'
import { signToken, isAuth } from '../../../utils/auth'
// import upload from '../../../utils/upload'
import multer from 'multer'

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
      callback(null, req.body.userName + '_' + file.fieldname + '-' + Date.now())
    }
  })
})

const handler = nc()
handler.use(isAuth, upload.single('avatar'))

handler.put(async (req, res) => {
  await db.connect()
  const user = await User.findOne({ email: req.body.email })

  user.profile.firstName = req.body.firstName
  user.profile.lastName = req.body.lastName
  user.profile.avatar = req.file.filename
    ? `/uploads/${req.file.filename}`
    : user.profile.avatar
  user.profile.dob = req.body.dob
  user.profile.facebook = req.body.facebook
  user.profile.instagram = req.body.instagram
  user.profile.twitter = req.body.twitter
  user.email = req.body.email
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password

  await user.save()
  await db.disconnect()

  const token = signToken(user)
  res.send({
    token,
    email: user.email,
    isAdmin: user.isAdmin,
    userName: user.userName,
    profile: user.profile,
    referralCode: user.referral.referralCode
  })
})

export default handler

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
}
