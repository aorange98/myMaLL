//引入分类模型
const Users = require('../schema/userSchema')
const express = require('express')
const app = express()

// 登录验证
exports.Login = async (req,res) => {
    const {username,password} = req.body
    // console.log(req.body)
    const result = await Users.findOne({username})
    // console.log(result)
    // 如果找到了该用户名 那么就匹对账号密码与数据库是否一致
    if(result){
        const user = await Users.find({username,password})
        console.log(user)
        // 如果是空数组，那么就输入账号密码错误
        if(user.length===0){
            res.send({
                status:1,    
                msg:'账号或密码错误或账号已被注册'  
            })
        }else{  // 如果不是空数组 那么就找到了
            const [userInfo] = user
            res.send({
                status:0,    
                msg:'登录成功！',
                data:user
            })

        }
    }else{  // 如果找不到用户名 那么就需要注册
        const addUser = await Users.create({username,password})
        console.log(addUser)
        let arr = []
        arr.push(addUser)
        res.send({
            status:0,
            msg:'注册成功!',
            data:arr
        }) 
    }
}


/**
 * https://www.npmjs.com/package/cookie_js
 * 
 * 大多数人希望以天为单位指定到期日期，但是如果要以分钟为单位指定到期日期，则可以配置cookie.expiresMultiplier：
 * 
    Cookie 。expiresMultiplier = 1 ; //  秒   
    Cookie 。expiresMultiplier = 60 ; //  分钟。   
    Cookie 。expiresMultiplier = 60 * 60 ; //  小时。     
    Cookie 。expiresMultiplier = 60 * 60 * 24 ; //  天数（默认）。   
 * 
 */
