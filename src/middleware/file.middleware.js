const multer = require('@koa/multer')

const upload = multer({
  dest: './upload'
})

const handleAvatar = upload.single('avatar')

module.exports = {
  handleAvatar
}