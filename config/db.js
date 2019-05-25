const Sequelize = require('sequelize');

const sequelize = new Sequelize('upTaskNode', 'root', 'Pegasus1313', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorsAliases: false,
    define: {
        timestamp: false
    }
});

module.exports = sequelize;