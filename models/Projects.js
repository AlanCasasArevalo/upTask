const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require("slug");
const shortid = require('shortid');

const Projects = db.define('Projects', {
    id: {
        //Ponemos los valores entre parenetesis para evitar consumo excesivo de memoria
        type: sequelize.INTEGER(50),
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.STRING(30),
    url: sequelize.STRING(40)
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