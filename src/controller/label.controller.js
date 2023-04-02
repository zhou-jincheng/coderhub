const labelService = require("../service/label.service")

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    await labelService.create(name)
    ctx.body = {
      code: 0,
      message: '创建标签成功！'
    }
  }

  async queryList(ctx, next) {
    const { limit = 10, offset = 0 } = ctx.request.query
    const list = await labelService.queryList(limit, offset)
    ctx.body = {
      code: 0,
      data: list
    }
  }
}

module.exports = new LabelController()