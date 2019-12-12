var Sequelize = require('sequelize')
var connect = require('./index').connect
var moment = require('moment')
const message = connect.define('message', {
    // 属性
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    address:Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}, {
    timestamps: false,
    tableName: 'message',
    freezeTableName:true
});

message.sync()

exports.message = message
