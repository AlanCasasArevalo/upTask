const sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Projects = require('../models/Projects');
const _constants = require('../src/config/constants');

const Users = db.define(_constants.USER_MODEL_CONSTANT.USER_MODEL_NAME, {
    id: {
        type: sequelize.INTEGER(_constants.USER_MODEL_CONSTANT.USER_ID_LENGTH),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize.STRING(_constants.USER_MODEL_CONSTANT.USER_EMAIL_STRING_LENGTH),
        allowNull: false,
        validate: {
            isEmail: {
                msg: _constants.USER_MODEL_CONSTANT.USER_EMAIL_FAIL_NO_VALID_EMAIL
            },
            notEmpty: {
                msg: _constants.USER_MODEL_CONSTANT.USER_EMAIL_FAIL_NO_EMPTY_EMAIL
            }
        },
        unique: {
            args: true,
            msg: _constants.USER_MODEL_CONSTANT.USER_EMAIL_FAIL_USER_ALREADY_REGISTER
        }
    },
    password: {
        type: sequelize.STRING(_constants.USER_MODEL_CONSTANT.USER_PASSWORD_STRING_LENGTH),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: _constants.USER_MODEL_CONSTANT.USER_EMAIL_FAIL_NO_EMPTY_PASSWORD
            }
        }
    },
    token: sequelize.STRING,
    expiration: sequelize.DATE
}, {
    hooks: {
        beforeCreate(user, options) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
        }
    }
});

Users.prototype.passwordVerification = function (password) {
    // Este metod te permite comparar los passwords para ver si son iguales y permitir o no al usuario entrear.
    return bcrypt.compareSync(password, this.password);
};

Users.hasMany(Projects);

module.exports = Users;
