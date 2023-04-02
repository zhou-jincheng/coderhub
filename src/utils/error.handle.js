const app = require('../app')
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRECT, NO_AUTHORIZATION, CONTENT_IS_EMPTY, OPERATION_IS_NOT_ALLOWED, RESOURCE_IS_NOT_EXISTS } = require('../config/error')

app.on('error', (type, ctx) => {
  let code = -1000
  let message = '自定义错误'
  switch (type) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或密码不能为空~'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = '当前用户名已被占用~'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '当前用户不存在~'
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004
      message = '用户名或密码错误~'
      break
    case NO_AUTHORIZATION:
      code = -1005
      message = 'token无效或已过期~'
      break
    case CONTENT_IS_EMPTY:
      code = -1006
      message = '用户动态不能为空~'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -1006
      message = '没有操作该资源权限~'
      break
    case RESOURCE_IS_NOT_EXISTS:
      code = -1007
      message = '资源不存在~'
      break
  }
  ctx.body = {
    code,
    message
  }
})