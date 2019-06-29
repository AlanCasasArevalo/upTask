const passport = require('passport');
const _constants = require('../src/config/constants');
const Users = require('../models/Users');
const _constant = require('../src/config/constants');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sendEmail = require('../handlers/mail');


// Funcion para autenticar el usuario
exports.userAuthentication = passport.authenticate(_constants.LITERALS_AUTHENTICATION_CONTROLLER.AUTHENTICATION_STRATEGY, {
    successRedirect: _constants.LITERALS_AUTHENTICATION_CONTROLLER.AUTHENTICATION_SUCCESS_REDIRECT_URL,
    failureRedirect: _constants.LITERALS_AUTHENTICATION_CONTROLLER.AUTHENTICATION_FAILURE_REDIRECT_URL,
    failureFlash: true,
    badRequestMessage: _constants.LITERALS_AUTHENTICATION_CONTROLLER.BAD_REQUEST_MESSAGE
});

// Funcion para revisar si el usuario esta logeado
exports.userAuthenticaticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect(_constants.LITERALS_AUTHENTICATION_CONTROLLER.POST_AUTHENTICATION);
    }
};

// Funcion para cerrar session
exports.closeSession = (req, res, next) => {
    req.session.destroy( () => {
        res.redirect(_constants.LITERALS_AUTHENTICATION_CONTROLLER.AUTHENTICATION_SUCCESS_REDIRECT_URL)
    })
};

// Funcion para enviar un token y resetear la contraseña
exports.toSendToken = async (req, res, next) => {
    // verificar que el usuario existe
    const email = req.body.email;

    const user = await Users.findOne({
        where: {
            email
        }
    });

    if (user && typeof user !== 'undefined') {
        const token = crypto.randomBytes(_constants.LITERALS_AUTHENTICATION_CONTROLLER.CRYPTO_RANDOM_BYTES).toString(_constants.LITERALS_AUTHENTICATION_CONTROLLER.CRYPTO_ENCODING_METHODS)
        const expiration = _constants.LITERALS_AUTHENTICATION_CONTROLLER.EXPIRATION_TIME_OUT

        user.token = token;
        user.expiration = expiration;

        const userSaved = await user.save();

        if (userSaved && typeof userSaved !== 'undefined') {
            // url de reset
            const resetUrl = `http://${req.headers.host}${_constant.INDEX_ROUTES_LITERALS.RESET_ACCOUNT}/${token}`;

            await sendEmail.toSendMail({
                from: '👻 UpTask <no-reply@uptask.com>',
                to : userSaved.email,
                subject: 'Resetear la contraseña Uptask',
                file: 'resetPassword',
                resetUrl,
            });

            req.flash('correcto', 'Revise su correo para poder actualizar la contraseña');
            res.redirect('/login')
        }
    } else {
        req.flash('error', 'La cuenta no existe');
        res.render(_constant.LITERALS_USER_CONTROLLER.RESET_ACCOUNT_RENDER)
    }
};

exports.tokenValidation = async (req, res, next) => {
    let token = req.params.token;

    if (token && typeof token !== 'undefined'){
        const user = await Users.findOne({
            where: {
                token
            }
        });

        if (user && typeof user !== 'undefined') {
            res.render('resetPassword', {
                pageName: 'Restablecer contraseña'
            });
        } else {
            req.flash('error', 'Token no valido o no se encuentra usuario');
            res.redirect(_constants.INDEX_ROUTES_LITERALS.RESET_ACCOUNT);
        }
    }
};

exports.updatePassword = async (req, res) => {
    const token = req.params.token;
    const password = req.body.password;

    if (token && typeof token !== 'undefined') {
        const user = await Users.findOne({
            where: {
                token,
                expiration: {
                    [Op.gte]: Date.now()
                }
            }
        });

        if (user && typeof user !== 'undefined' && password && typeof password !== 'undefined') {
            user.token = null;
            user.expiration = null;
            user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            const userPasswordUpdate = await user.save();

            if (userPasswordUpdate && typeof userPasswordUpdate !== 'undefined') {
                req.flash('correcto', 'Tu password se modifico correctamente');
                res.redirect('/login')
            } else {
                req.flash('error', 'Usuario no se pudo guardar correctamente');
                res.render('resetAccount')
            }
        } else {
            req.flash('error', 'Token no valido');
            res.render('resetAccount')
        }
    } else {
        // no hay token
        req.flash('error', 'Token Necesario para mostrar la pagina');
        res.render('/reset-account')
    }

};