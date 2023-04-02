const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const commentController = require('../controller/comment.controller')
const { verifyPermission } = require('../middleware/permission.middle')

const commentRouter = new KoaRouter({
  prefix: '/comment'
})

commentRouter.post('/', verifyAuth, commentController.create)
commentRouter.post('/reply', verifyAuth, commentController.reply)
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, commentController.delete)

module.exports = commentRouter