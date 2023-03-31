const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require("../config/error")
const userService = require('../service/user.service')
const { md5EncryptPassword } = require("../utils/encrypt")

const verifyUser = async (ctx, next) => {
  const user = ctx.request.body

  const { name, password } = user

  if (!name || !password) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    return
  }

  const [values] = await userService.findUserByName(name)
  if (values.length) {
    ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
    return
  }

  await next()
}

const encryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const encryptPassword = md5EncryptPassword(password)
  ctx.request.body.password = encryptPassword

  await next()
}

module.exports = {
  verifyUser,
  encryptPassword
}