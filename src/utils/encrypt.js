const crypto = require('crypto')

const md5EncryptPassword = (password) => {
  const md5 = crypto.createHash('md5')
  const md5Password = md5.update(String(password)).digest('hex')
  return md5Password
}

module.exports = {
  md5EncryptPassword
}