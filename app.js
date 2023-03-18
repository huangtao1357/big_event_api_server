const express = require('express')

const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({extended:false}))

//导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)


app.listen(3007, ()=>{
    console.log('api server running at http://127.0.0.1:3007');
})