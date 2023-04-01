const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/key')

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user

    // 生成token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256',
      allowInsecureKeySizes: true
    })

    // 返回相应信息
    ctx.body = {
      code: 0,
      data: {
       id,
       name,
       token
      }
    }
  }

  test(ctx, next) {
    ctx.body = '请求成功！'                         
  }
}

module.exports = new LoginController