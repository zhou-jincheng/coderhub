const { CONTENT_IS_EMPTY } = require("../config/error")
const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const { content } = ctx.request.body
    if (!content) {
      ctx.app.emit('error', CONTENT_IS_EMPTY, ctx)
      return
    }

    const { id } = ctx.user
    await momentService.create(content, id)
    ctx.body = {
      code: 0,
      message: '创建用户动态成功！'
    }
  }

  async queryList(ctx, next) {
    const { limit = 10, offset = 0 } = ctx.request.query
    const list = await momentService.queryList(limit, offset)
    ctx.body = {
      code: 0,
      data: list
    }
  }

  async queryById(ctx, next) {
    const { momentId } = ctx.params
    const moment = await momentService.queryById(momentId)
    ctx.body = {
      code: 0,
      data: moment
    }
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    if (!content) {
      ctx.app.emit('error', CONTENT_IS_EMPTY, ctx)
      return
    }
    
    const result = await momentService.update(momentId, content)
    ctx.body = {
      code: 0,
      data: result
    }
  }
}

module.exports = new MomentController()