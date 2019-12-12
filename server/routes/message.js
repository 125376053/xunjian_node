var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
var message = require('../model/message').message

router.get('/list',async function(req,res){

    var pageIndex = req.query.pageindex //页码
    var pageSize = req.query.pagesize // 条数
    var pages = 0
    //console.log(pageIndex, pageSize);

    let ret = await message.findAll({
        raw:true,
        limit: parseInt(pageSize), // 截取 要多少条
        offset: (pageIndex-1)*pageSize, // 偏移跳过 页码-1 * 条数
    })
    let count = await message.count()
    pages = Math.ceil(count/pageSize)
    //console.log(ret,count,pages);
    res.send({
        code:1,
        msg:'ok',
        data:{
            pageSize,
            pageIndex,
            count,
            pages,
            dataList:ret
        }
    })
})

module.exports = router;
