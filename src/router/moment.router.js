const KoaRouter = require('@koa/router')
const momentController = require('../controller/moment.controller')
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middle')
const { verifyLabelsExist } = require('../middleware/moment.middleware')

const momentRouter = new KoaRouter({
  prefix: '/moment'
})
// 增加
momentRouter.post('/', verifyAuth, momentController.create)
// 查找
momentRouter.get('/list', momentController.queryList)
momentRouter.get('/:momentId', momentController.queryById)

// 修改
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, momentController.update)
// 删除
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.delete)

// 添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelsExist, momentController.addLabels)

module.exports = momentRouter