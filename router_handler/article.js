const db = require("../db")

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({dest:path.join(__dirname, '../uploads')})


// 发布新文章的处理函数
exports.addArticle = (req, res)=>{
    // 手动判断是否上传了文章封面
    if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

    // 整理要插入数据库的文章信息对象
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.auth.id,
    }
    // 定义sql
    const sql = `insert into ev_articles set ?`
    // 执行sql
    db.query(sql, articleInfo, (err, results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('发布文章失败！')

        // 发布文章成功
        res.cc('发布文章成功！', 0)
    })

    
}