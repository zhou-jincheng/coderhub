const mysql = require('mysql2')

const connection = mysql.createPool({
  database: 'coderhub',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '$Happyman06250915',
  connectionLimit: 5
})


connection.getConnection((err, connection) => {
  if (err) {
    console.log('数据库连接失败！', err)
    return
  }

  connection.connect((err) => {
    if (err) {
      console.log('数据库连接失败!', err)
    } else {
      console.log('数据库连接成功！可以进行数据库操作啦~')
    }
  })
})

module.exports = connection.promise()
