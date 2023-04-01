
const db = require('../db/index')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')

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

// 重置密码的处理函数
exports.updatePassword = (req,res)=>{
    const sql = `select * from ev_users where id = ?`
    db.query(sql,req.auth.id, (err,results)=>{
        // 执行sql 语句失败
        if(err) return res.cc(err)
        // 判断结果是否存在
        if(results.length !== 1) return res.cc('用户不存在！')
        // 判断用户输入的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if(!compareResult) return res.cc('旧密码错误！')
        // 更新数据库中的数据
        // 定义sql
        const sql = `update ev_users set password = ? where id = ?`
        // 对新密码进行加密
        const newPwd =   bcrypt.hashSync(req.body.newPwd, 10)

        // 执行sql
        db.query(sql,[newPwd, req.auth.id],(err,results)=>{
            if(err) return res.cc(err)

            if(results.affectedRows !== 1) return res.cc('更新密码失败！')

            res.cc('更新密码成功！', 0)
        })
    })
}

// 更新用户头像的处理函数
exports.updateAvatar  = (req, res)=>{
   //定义sql
   const sql = `update ev_users set user_pic = ? where id = ?`
//    执行sql 
   db.query(sql, [req.body.avatar, req.auth.id], (err,results)=>{
     if(err) return res.cc(err)
     if(results.affectedRows !== 1) return res.cc('更新头像失败！')
    //  更新头像成功
     res.cc('更新头像成功！', 0)
   })
}