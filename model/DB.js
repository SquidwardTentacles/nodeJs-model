var mysql = require('mysql')
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'book-city'
})

let db = {}
db.q = function (sql, data, callback) {
  return new Promise((resolve, reject) => {
    // 从连接池中取出链接 
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      // 使用链接
      connection.query(sql, data, function (error, results, fields) {
        // 释放链接 
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(results)
      })
    })
  })
}

module.exports = db