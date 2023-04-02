const { OPERATION_IS_NOT_ALLOWED, RESOURCE_IS_NOT_EXISTS } = require("../config/error")
const permissionService = require("../service/permission.service")

const verifyPermission = async (ctx, next) => {
  const key = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[key]
  const resourceName = key.replace('Id', '')
  const { id } = ctx.user

  const hasResource = await permissionService.checkResource(resourceName, resourceId)
  if (!hasResource) {
    ctx.app.emit('error', RESOURCE_IS_NOT_EXISTS, ctx)
    return
  }
  const boolean = await permissionService.checkPermission(resourceName, resourceId, id)
  if (!boolean) {
    ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
    return
  }

  await next()
}

module.exports = {
  verifyPermission
}