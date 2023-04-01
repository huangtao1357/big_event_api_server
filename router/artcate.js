const express = require('express')

const router = express.Router()

// 挂载路由
const artcateHandler = require('../router_handler/artcate')

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章分类的验证模块
const {add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema} = require('../schema/artcate')

// 导入路由处理函数模块
router.get('/cates', artcateHandler.getArticleCates)
// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema) ,artcateHandler.addArticleCates)

// 删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema) ,artcateHandler.deleteCateById)

// 根据 Id 获取文章分类的处理函数
router.get('/cates/:id', expressJoi(get_cate_schema) ,artcateHandler.getArticleById)

// 更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema) , artcateHandler.updateCateById)

// 向外共享路由对象
module.exports = router