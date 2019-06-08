const sequelize = require('sequelize');
const db = require('../config/db');
const Projects = require('../models/Projects');
const Users = db.define('Users', {
    id: {
        type: sequelize.INTEGER(50),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    password: {
        type: sequelize.STRING(60),
        allowNull: false
    },
});
Users.hasMany(Projects);

module.exports = Users;
