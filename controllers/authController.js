const passport = require('passport');
const _constants = require('../src/config/constants');
const Users = require('../models/Users');
const _constant = require('../src/config/constants');
const crypto = require('crypto');

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
            const resetUrl = `http://${req.headers.host}/${_constant.INDEX_ROUTES_LITERALS.RESET_ACCOUNT}/${token}`
        }
    } else {
        req.flash('error', 'La cuenta no existe');
        res.render(_constant.LITERALS_USER_CONTROLLER.RESET_ACCOUNT_RENDER)
    }
};

exports.resetPassword = async (req, res, next) => {
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
