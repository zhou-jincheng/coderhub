const { RESOURCE_IS_NOT_EXISTS } = require('../config/error')
const userService = require('../service/user.service')
const service = require('../service/user.service')
const fs = require('fs')

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body

    // 将用户写入数据库
    const [result] = await service.create(user)

    // 返回注册用户结果
    ctx.body = {
      message: '用户注册成功！',
      result
    }
  }

  async getAvatar(ctx, next) {
    const { userId } = ctx.params
    const avatar = await userService.findAvatarByUserId(userId)
    if (!avatar) {
      ctx.app.emit('error', RESOURCE_IS_NOT_EXISTS, ctx)
      return
    }
    const { filename, mimetype } = avatar
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`./upload/${filename}`)
  }
}

module.exports = new UserController