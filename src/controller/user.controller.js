const service = require('../service/user.service')

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
}

module.exports = new UserController