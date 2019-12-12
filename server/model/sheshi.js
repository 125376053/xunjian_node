
var Sequelize = require('sequelize')
var connect = require('./index').connect
const Sheshi = connect.define('sheshi', {
    // 属性
    name:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    num:{
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'sheshi',
    freezeTableName:true
});

Sheshi.sync()

exports.Sheshi = Sheshi