const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())

const userRouter = require('../router/user.router')
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

module.exports = app