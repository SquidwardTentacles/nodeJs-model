const db = require('./DB.js')
module.exports = {
  lookupUser: async (args) => {
    let sql = `select * from back_user where account = ?`
    let arr = Object.values(args)
    if (arr.length > 1) {
      sql = `select * from back_user where account = ? and password`
    }
    return await db.q(sql, arr)


  },
  insertPeo: async (args) => await db.q(`insert into back_user(account,password) values(?,?)`, Object.values(args))
}