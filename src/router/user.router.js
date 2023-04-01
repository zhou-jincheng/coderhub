const Router = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUser, encryptPassword } = require('../middleware/user.middleware')

const userRouter = new Router({
  prefix: '/user'
})

// 注册用户
userRouter.post('/register',verifyUser, encryptPassword, userController.create)

module.exports = userRouter