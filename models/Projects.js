const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require("slug");
const shortid = require('shortid');
const _constants = require('../src/config/constants');

const Projects = db.define(_constants.PROJECT_MODEL_CONSTANT.PROJECT_MODEL_NAME, {
    id: {
        //Ponemos los valores entre parenetesis para evitar consumo excesivo de memoria
        type: sequelize.INTEGER(_constants.PROJECT_MODEL_CONSTANT.PROJECT_ID_LENGTH),
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.STRING(_constants.PROJECT_MODEL_CONSTANT.PROJECT_NAME_STRING_LENGTH),
    url: sequelize.STRING(_constants.PROJECT_MODEL_CONSTANT.PROJECT_URL_STRING_LENGTH)
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