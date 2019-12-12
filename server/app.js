var express =require('express')
var app= express()
var path = require('path')
var bodyParse = require('body-parser')
var jwt = require('jsonwebtoken');

app.use(bodyParse())
app.use(express.static(path.join(__dirname,'dist')));

app.get('/', function(req, res, next) {
    //res.render('./dist/index.html')
    res.sendFile(path.resolve('./dist/index.html'))
});

app.use(function(req,res,next){
    // 不校验token
    if(req.path =='/users/login'){
        next()
        return
    }
    // 校验token  获取前端请求头发送过来的tokenid
    var tokenid=req.headers.token
    if(tokenid && tokenid!='null'){
        jwt.verify(tokenid, 'jiamia', function(err,decoded) {
            //如果tokenid过期则会执行err的代码块，或者匹配不正确
            if (err) {
                return res.json({
                    code:400,
                    msg: 'token不合法'
                });
            } else {
                //将解码信息储存于req中方便其他路由使用 decoded:指的是tokneid解码后用户信息
                req.decoded = decoded;
                next()
            }
        })
    }else{
        res.json({
            code:400,
            msg: 'token失效'
        });
    }
})

// 路由处理
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messageRouter = require('./routes/message');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/message', messageRouter);
app.listen(3001)
