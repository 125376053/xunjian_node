
var Sequelize = require('sequelize')
var connect = require('./index').connect
const yunxing = connect.define('yunxing', {
    // 属性
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    good:{
        type: Sequelize.INTEGER
    },
    borken:{
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'yunxing',
    freezeTableName:true
});

yunxing.sync()

exports.yunxing = yunxing