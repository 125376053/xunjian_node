var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../model/User').User

// 直接登录直接保存用户 省略了注册步骤验证
router.post('/login',function(req,res){
    var username = req.body.username
    var password = req.body.password

    // 查询用户是否存在
    User.findOne({
        where:{
            username
        }
    }).then(ret=>{
        // 不存在创建用户
        if(!ret){
            User.create({
                username,
                password
            }).then(ret=>{
                var tokenid = jwt.sign({
                    name:username,
                },'jiamia', {
                    expiresIn: 180 //3分钟过期
                });
                res.json({
                    code:1,
                    msg:'登录成功',
                    user:{
                        userInfo:ret.toJSON().username,
                        token:tokenid
                    }
                })
            })
        }else{
            // 存在 密码是否一致
            if(ret.toJSON().password == password){
                var tokenid = jwt.sign({
                    name:username,
                },'jiamia', {
                    expiresIn: 60*60*1 //60分钟过期
                });
                res.json({
                    code:1,
                    msg:'登录成功',
                    user:{
                        userInfo:ret.toJSON().username,
                        token:tokenid
                    }
                })
            }else {
                res.json({
                    code:0,
                    msg:'密码不正确'
                })
            }
        }
    })
})

// 获取用户信息
router.get('/getUser',function(req,res){
    var tokenid =req.query.token
    jwt.verify(tokenid, 'jiamia', function(err,decoded) {
        //如果tokenid过期则会执行err的代码块，或者匹配不正确
        if (err) {
            return res.json({
                code:400,
                msg: 'token不合法'
            });
        } else {
            console.log(decoded);
            res.json({
                code:1,
                msg:'解析成功',
                decoded
            })
        }
    })
})

module.exports = router;
