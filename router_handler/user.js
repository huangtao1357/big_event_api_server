const db = require("../db")

const bcrypt = require('bcryptjs')

// 注册新用户的处理函数
exports.regUser = (req, res)=>{
    const userinfo = req.body
    // if(!userinfo.username || !userinfo.password) {
    //     return res.send({status:1, message:'用户名或密码不能为空！'})
    // }

    const sqlStr = 'select * from ev_users where username = ?';
    db.query(sqlStr, [userinfo.username], (err, results)=>{
        if(err) {
            // return res.send({status:1, message:err.message})
            return res.cc(err)
        }

        if(results.length > 0) {
            // return res.send({status : 1, message:'用户名被占用，请更换其他用户名'})
            return res.cc('用户名被占用，请更换其他用户名')
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
   
        const sql = 'insert into ev_users set ?';
        db.query(sql, {username: userinfo.username, password:userinfo.password},(err,results)=>{
            // if(err) return res.send({status:1, message:err.message})
            if(err) return res.cc(err)
    
            if(results.affectedRows != 1) {
                // return res.send({status:1, message:'注册用户失败，请稍后再试！'})
                return res.send('注册用户失败，请稍后再试！')
            }
    
            // 注册成功
            // res.send({status:0, message:'注册成功！'})
            res.send('注册成功！', 0)
        })

    })
}

// 登录的处理函数
exports.login = (req,res)=>{
    res.send('login OK')
}