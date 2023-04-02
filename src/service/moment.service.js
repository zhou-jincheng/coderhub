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
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url, 'createAt', u.createAt, 'updateAt', u.updateAt) user,
      (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
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
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url, 'createAt', u.createAt, 'updateAt', u.updateAt) user,
        (
          SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
            'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarURL', cu.avatar_url)
            )
          )
          FROM comment c
          LEFT JOIN user cu ON cu.id = c.user_id
          WHERE c.moment_id = m.id
        ) comments,
        JSON_ARRAYAGG(
          JSON_OBJECT('id', l.id, 'name', l.name)
        ) labels
      FROM moment m
      
      LEFT JOIN user u ON u.id = m.user_id
      
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id
      
      WHERE m.id = ?
      GROUP BY m.id
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

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return !!result.length
  }
}

module.exports = new MomentService