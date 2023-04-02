const fileService = require("../service/file.service")
const userService = require("../service/user.service")
const { SERVER_PROTOCAL, SERVER_HOST, SERVER_PORT } = require('../config/server')

class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.file
    const { id } = ctx.user
    // 加入图片信息
    await fileService.create(filename, mimetype, size, id)
    // 修改用户头像信息
    const avatarUrl = `${SERVER_PROTOCAL}://${SERVER_HOST}:${SERVER_PORT}/user/avatar/${id}`
    await userService.updateAvatar(avatarUrl, id)

    ctx.body = {
      code: 0,
      message: '文件上传成功！',
      avatarUrl
    }
  }
}

module.exports = new FileController()