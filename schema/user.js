//导入验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义id，nickname,email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()

//定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body:{
        username,
        password
    }
}

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    // 需要对req.body里面的数据进行验证
    body: {
        id,
        nickname,
        email
    }
}

// 验证规则对象-更新密码
exports.update_password_schema = {
    body:{
        oldPwd:password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 验证规则对象-更新对象
exports.update_avatar_schema = {
    body:{
        avatar
    }
}