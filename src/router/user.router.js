const Router = require('@koa/router')
const controller = require('../controller/user.controller')
const { verifyUser } = require('../middleware/user.middleware')

const userRouter = new Router({
  prefix: '/user'
})

// 注册用户
userRouter.post('/register',verifyUser, controller.create)

module.exports = userRouter