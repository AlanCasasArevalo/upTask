const Sequelize = require('sequelize');

const sequelize = new Sequelize('upTask', 'root', 'YOUR_MYSQL_KEY', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorsAliases: false,
    define: {
        timestamp: false
    }
});