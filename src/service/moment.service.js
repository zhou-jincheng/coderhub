const connection = require("../app/database")

class MomentService {
  async create(content, userId) {
    const statement = 'INSERT INTO moment (content, user_id) VALUES(?, ?)'
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  async queryList(limit, offset) {
    const statement = `
      SELECT
      m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
      JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', u.updateAt) user
      FROM moment m
      LEFT JOIN user u
      ON m.user_id = u.id
      LIMIT ? OFFSET ?
    `
    const [result] = await connection.execute(statement, [String(limit), String(offset)])
    return result
  }

  async queryById(id) {
    const statement = `
      SELECT
      m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
      JSON_OBJECT('id', u.id, 'name', u.name, 'createAt', u.createAt, 'updateAt', u.updateAt) user
      FROM moment m
      LEFT JOIN user u
      ON m.user_id = u.id
      WHERE m.id = ?
    `
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }

  async update(id, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`
    await connection.execute(statement, [content, id])
    return this.queryById(id)
  }

  async delete(id) {
    const statement = 'DELETE FROM moment WHERE id = ?'
    const [result] = await connection.execute(statement, [id])
    return result
  }
}

module.exports = new MomentService