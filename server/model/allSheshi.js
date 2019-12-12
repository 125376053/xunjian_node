var Sequelize = require('sequelize')
var connect = require('./index').connect
var moment = require('moment')
const allSheshi = connect.define('allSheshi', {
    // 属性
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
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
    tableName: 'allSheshi',
    freezeTableName:true
});

/*allSheshi.bulkCreate([
    {name:1},
    {name:2},
    {name:3},
    {name:4},
    {name:5},
    {name:6},
    {name:7}
])*/

allSheshi.sync()

exports.allSheshi = allSheshi
