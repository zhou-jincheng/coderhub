const connection = require('../app/database')

class UserService {
  create(user) {
    const { name, password } = user

    const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?)'

    return connection.execute(statement, [name, password])
  }

  async findUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?'
    const [users] = await connection.execute(statement, [name])
    return users
  }

  async findAvatarByUserId(userId) {
    const statement =  `SELECT * FROM avatar WHERE user_id = ?`
    const [result] = await connection.execute(statement, [userId])
    return result.pop()
  }

  async updateAvatar(avatarUrl, userId) {
    const statement = `UPDATE user set avatar_url = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService()