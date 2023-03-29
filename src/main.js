const Koa = require('koa')

const Router = require('@koa/router')

const userRouter = new Router({
  prefix: '/user'
})

userRouter.get('/list', (ctx, next) => {
  ctx.body = '服务器访问成功'
})

const app = new Koa()

app.use(userRouter.routes())
app.use(userRouter.allowedMethods)

const port = 8000
app.listen(port, () => {
  console.log(`服务器启动在：http://localhost:${port}`)
})