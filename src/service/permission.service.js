const connection = require('../app/database')

class PermissionService {
  async checkMoment(id, userId) {
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?`
    const [result] = await connection.execute(statement, [id, userId])
    return !!result.length
  }
}

module.exports = new PermissionService()