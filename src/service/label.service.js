const connection = require('../app/database')

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?)`
    const [result] = await connection.execute(statement, [name])
    return result
  }

  async queryList(limit, offset) {
    const statement = `SELECT * FROM label LIMIT ? OFFSET ?`
    const [result] = await connection.execute(statement, [String(limit), String(offset)])
    return result
  }

  async queryByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?`
    const [result] = await connection.execute(statement, [name])
    return result[0]
  }
}

module.exports = new LabelService()