const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'my_db_01'
})

// 向外共享db连接对象
module.exports = db