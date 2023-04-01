const jwt = require('jsonwebtoken')
const userService = require("../service/user.service")
const { md5EncryptPassword } = require("../utils/encrypt")
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRECT, NO_AUTHORIZATION } = require("../config/error")
const { PUBLIC_KEY } = require('../app/key')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 用户名和密码不能为空
  if (!name || !password) {
    ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    return
  }

  // 检查用户是否存在
  const users = await userService.findUserByName(name)
  const user = users[0]
  if (!user) {
    ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
    return
  }

  // 检查密码是否准确
  if (user.password !== md5EncryptPassword(password)) {
    ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
    return
  }

  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    ctx.app.emit('error', NO_AUTHORIZATION, ctx)
    return
  }
  const token = authorization.replace('Bearer ', '')

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch {
    ctx.app.emit('error', NO_AUTHORIZATION, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}