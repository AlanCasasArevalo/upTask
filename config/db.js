const Sequelize = require('sequelize');

const sequelize = new Sequelize('upTask', 'root', 'YOUR_MYSQL_KEY', {
    host: 'localhost',
    dialect: 'mssql'
});