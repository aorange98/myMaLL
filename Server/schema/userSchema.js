const mongoose = require('mongoose')
// 定义数据格式
let userSchema = new mongoose.Schema({
    username:{      // 用户名
        type:String,    
        required:true
    },
    password:{      // 密码
        type:String,
        required:true
    },
    create_time:{      // 用户创建的初始时间
        type:Date,    // 须写类型
        default:new Date()
    },

})
// 将集合(表)和数据格式关联起来了 myMall数据库下的users表 使用这个数据
// exports.Users = mongoose.model('users',userSchema)
// 默认导出
module.exports = mongoose.model('users',userSchema)
