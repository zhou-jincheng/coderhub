const { OPERATION_IS_NOT_ALLOWED } = require("../config/error")
const permissionService = require("../service/permission.service")

const verifyMomentPermission = async (ctx, next) => {
  const { momentId } = ctx.params
  const { id } = ctx.user

  const boolean = await permissionService.checkMoment(momentId, id)
  if (!boolean) {
    ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
    return
  }

  await next()
}

module.exports = {
  verifyMomentPermission
}