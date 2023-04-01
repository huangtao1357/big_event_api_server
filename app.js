const express = require('express')
const joi  = require('joi')

const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({extended:false}))

// 一定要在路由之前，封装res.cc函数
app.use((req,res,next)=>{
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error? err.message:err
        })
    }

    next()
})

// 一定要在路由之前配置解析token的中间件
const { expressjwt }  = require('express-jwt');
const config = require('./config');
app.use(expressjwt({secret: config.jwtSecretKey, algorithms: ['HS256']}).unless({path: [/^\/api\//]}));



//导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入用户信息路由模块
const userinfoRouter  = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 导入并使用文章分类路由模块
const artcateRouter = require('./router/artcate')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artcateRouter)

// 定义错误级别的中间件
app.use((err,req,res,next)=>{
 // 验证失败导致的错误
 if(err instanceof joi.ValidationError) return res.cc(err)

 if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
//   未知的错误
  res.cc(err)
})


app.listen(3007, ()=>{
    console.log('api server running at http://127.0.0.1:3007');
})