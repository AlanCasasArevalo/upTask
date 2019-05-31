const sequelize = require('sequelize');
const db = require('../config/db');

const Tasks = db.define('Tasks', {
    id: {
        type: sequelize.INTEGER(50),
        primaryKey: true,
        autoIncrement: true
    },
    task: sequelize.STRING(150),
    state: sequelize.INTEGER(3)
});

module.exports = Tasks;
