const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require("slug");
const shortid = require('shortid');

const Projects = db.define('Projects', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.STRING,
    url: sequelize.STRING
}, {
    // Los hooks son parte del ciclo de vida de insercion en la base de datos de Sequelize
    hooks: {
        beforeCreate(project, options) {
            const url = slug(project.name.toLowerCase());
            project.url = `${url}-${shortid.generate()}`
        }
    }
});

module.exports = Projects;