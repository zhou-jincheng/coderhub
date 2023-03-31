const connection = require('../app/database')

class UserService {
  create(user) {
    const { name, password } = user

    const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?)'

    return connection.execute(statement, [name, password])
  }

  findUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?'
    return connection.execute(statement, [name])
  }
}

module.exports = new UserService()