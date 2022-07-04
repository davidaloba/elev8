import nc from 'next-connect'
import db from '../../../db'
import { isAuth } from '../../../utils/auth'
import multer from 'multer'

const upload = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, './public/uploads/dps')
    },
    filename (req, file, cb) {
      const extArray = file.mimetype.split('/')
      const extension = extArray[extArray.length - 1]
      // const title = req.query.userName.replace(/ /g, '-') + '-' + req.query.preacher.replace(/ /g, '-')
      cb(null, `${req.query.userName}-avatar-${Date.now()}.${extension}`)
    }
  })
}).single('avatar')

const handler = nc()
handler.use(isAuth, upload)

handler.post(async (req, res) => {
  await db.connect()
  res.send(`/${req.file.path}`)
})

export default handler

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
}
