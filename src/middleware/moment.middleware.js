const labelService = require("../service/label.service")

const verifyLabelsExist = async (ctx, next) => {
  const { labels } = ctx.request.body
  
  const labelInfosList = []

  for (const name of labels) {
    const temp = { name }
    const result = await labelService.queryByName(name)
    if (result) {
      temp.id = result.id
    } else {
      const result = await labelService.create(name)
      temp.id = result.insertId
    }
    labelInfosList.push(temp)
  }

  ctx.labels = labelInfosList
  await next()
}

module.exports = {
  verifyLabelsExist
}