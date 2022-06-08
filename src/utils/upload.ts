import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(req.body)
    console.log(file)
    callback(null, 'uploads')
  },
  filename: (req, file, callback) => {
    console.log(req.body)
    console.log(file)
    callback(null, req.body.username + '_' + file.fieldname + '-' + Date.now())
  }
})

export default multer({ storage })
