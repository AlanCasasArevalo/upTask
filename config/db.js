const Sequelize = require('sequelize');
const _constants = require('.././src/config/constants');

const sequelize = new Sequelize(_constants.SEQUELIZE_SETUP.TABLE_NAME, _constants.SEQUELIZE_SETUP.ADMIN_NAME, _constants.SEQUELIZE_SETUP.PASSWORD, {
    host: _constants.SEQUELIZE_SETUP.HOST,
    dialect: _constants.SEQUELIZE_SETUP.DIALECT,
    port: _constants.SEQUELIZE_SETUP.PORT,
    define: {
        timestamp: false
    }
});

module.exports = sequelize;