const sequelize = require('sequelize');

const db = require('../config/db');

const Projects = db.define('Projects', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize.STRING,
        url: sequelize.STRING
    }
});

module.exports = Projects;