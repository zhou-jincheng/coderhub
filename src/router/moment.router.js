const KoaRouter = require('@koa/router')
const momentController = require('../controller/moment.controller')
const { verifyAuth } = require('../middleware/login.middleware')

const momentRouter = new KoaRouter({
  prefix: '/moment'
})

momentRouter.post('/', verifyAuth, momentController.create)

module.exports = momentRouter