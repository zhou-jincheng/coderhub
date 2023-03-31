const app = require('./app')

const { SERVER_PORT } = require('./config/server')

// 加载错误处理
require('./utils/error.handle')

app.listen(SERVER_PORT, () => {
  console.log(`服务器启动在：http://localhost:${SERVER_PORT}`)
})