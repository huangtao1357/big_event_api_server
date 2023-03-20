const db = require("../db")

const bcrypt = require('bcryptjs')

// 导入生成token的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

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
    //获取请求体数据
    const userinfo = req.body
    //定义sql语句
    const sqlStr = 'select * from ev_users where username = ?';
    //执行查询
    db.query(sqlStr,userinfo.username, (err,results)=>{
        if(err) return res.cc(err)

        if(results.length !== 1) return res.cc('登录失败！')

        //  判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if(!compareResult) return res.cc('登录失败！')

        // 在服务器端生成token字符串
        const user = {...results[0], password:'',user_pic:''}
        //对用户的信息进行加密，生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
        // 将token响应给客户端
        res.send({
            status: 0,
            message:'登录成功！',
            token: 'Bearer ' + tokenStr
        })
    })
}