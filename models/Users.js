const sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
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
}, {
    hooks: {
        beforeCreate(user, options) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
        }
    }
});
Users.hasMany(Projects);

module.exports = Users;
