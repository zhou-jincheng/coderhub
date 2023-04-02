const KoaRouter = require('@koa/router')
const { handleAvatar } = require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/login.middleware')
const fileController = require('../controller/file.controller')

const uploadRouter = new KoaRouter({
  prefix: '/file'
})

uploadRouter.post('/avatar', verifyAuth, handleAvatar, fileController.create)

module.exports = uploadRouter