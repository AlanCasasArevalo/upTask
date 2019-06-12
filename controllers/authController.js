const passport = require('passport');
const _constants = require('../src/config/constants');

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