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
}

module.exports = new UserService()