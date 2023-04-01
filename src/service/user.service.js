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
}

module.exports = new UserService()