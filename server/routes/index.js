var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
var sheshi = require('../model/sheshi').Sheshi
var yunxing = require('../model/yunxing').yunxing

var allSheshi = require('../model/allSheshi').allSheshi

router.post('/sheshi',async function(req,res){
    let num = await sheshi.findAll({
        raw:true,
        attributes: [[Sequelize.fn('sum', Sequelize.col('num')), 'num']],
    })
    let length = await sheshi.count()
    let datalist = await sheshi.findAll({raw:true})
    res.send({
        code:1,
        msg:'ok',
        data:{
            num:num[0].num,
            length:length,
            datalist:datalist
        }
    })
})

router.post('/yunxing',async function(req,res){
    let num = await yunxing.findAll({
        raw:true,
        attributes: [
            [Sequelize.fn('sum', Sequelize.col('good')), 'good'],
            [Sequelize.fn('sum', Sequelize.col('borken')), 'borken']
        ],
    })
    let datalist = await yunxing.findAll({raw:true})
    res.send({
        code:1,
        msg:'ok',
        data:{
            good:num[0].good,
            borken:num[0].borken,
            datalist:datalist
        }
    })
})

router.get('/allSheshi',async(req,res)=>{
    let ret = await allSheshi.findAll({raw:true})
    console.log(ret);
    res.send({
        code:1,
        msg:'ok',
        data:{
            list:ret
        }
    })
})

module.exports = router;
