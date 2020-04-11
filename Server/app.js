const express = require('express')
const app = express()
const fs = require('fs')
const mongoose = require('mongoose')
let bodyParser = require('body-parser')

app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const {Login} = require('./controller/login')



// 登录验证
app.post('/myapi/login',Login)

// 处理前台路由刷新找不到
app.use((req,res)=>{
    // 更改响应头   默认是：Content-Type: application/octet-stream  不然他会自动下载的
    res.set('Content-Type','text/html; charset=UTF-8')
    const data = fs.readFileSync(__dirname+'/public/index.html');
    // console.log(data)   // buffer
    res.send(data)
})


mongoose.connect('mongodb://localhost:27017/myMall',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async ()=>{ // 成功触发then第一个回调
    console.log('数据库链接成功')
    app.listen('8592',()=>{
        console.log('8592端口成功运行')
    })
}).catch(()=>{  // 失败触发catch第一个回调
    console.log('数据库连接失败')
})



