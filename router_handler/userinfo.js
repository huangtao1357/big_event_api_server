
const db = require('../db/index')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req,res)=>{
    // 定义查询语句
    const sql = 'select username,nickname,email,user_pic from ev_users where id = ?';

    // 执行查询语句
    db.query(sql, req.auth.id, (err,results)=>{
        if(err) return res.cc(err)

        if(results.length !== 1) return res.cc('查看用户基本信息失败！')

        // 查询用户基本信息成功
        res.send({
            status: 0,
            message: '查询用户信息成功！',
            data: results[0]
        })
    })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req,res)=>{
    // 定义sql
    const sql = `update ev_users set ? where id = ?`
    // 执行sql
    db.query(sql,[req.body, req.body.id],(err,results)=>{
        if(err) return res.cc(err)

        // 影响行数不等于1
        if(results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')

        // 成功
        res.cc('更新用户信息成功！', 0)
    })
}