const sequelize = require('sequelize');
const Projects = require('./Projects');
const db = require('../config/db');

const Tasks = db.define('Tasks', {
    id: {
        type: sequelize.INTEGER(50),
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.STRING(150),
    status: sequelize.INTEGER(3)
});
Tasks.belongsTo(Projects);

module.exports = Tasks;
