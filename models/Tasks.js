const sequelize = require('sequelize');
const Projects = require('./Projects');
const db = require('../config/db');
const _constants = require('../src/config/constants');

const Tasks = db.define(_constants.TASK_MODEL_CONSTANT.TASK_MODEL_NAME, {
    id: {
        type: sequelize.INTEGER(_constants.TASK_MODEL_CONSTANT.TASK_ID_LENGTH),
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.STRING(_constants.TASK_MODEL_CONSTANT.TASK_NAME_STRING_LENGTH),
    status: sequelize.INTEGER(_constants.TASK_MODEL_CONSTANT.TASK_STATUS_STRING_LENGTH)
});
Tasks.belongsTo(Projects);

module.exports = Tasks;
