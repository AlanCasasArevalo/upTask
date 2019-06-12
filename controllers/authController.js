const passport = require('passport');
const _constants = require('../src/config/constants');

exports.userAuthentication = passport.authenticate(_constants.LITERALS_AUTHENTICATION_CONTROLLER.AUTHENTICATION_STRATEGY, {
    successRedirect: _constants.LITERALS_AUTHENTICATION_CONTROLLER.AUTHENTICATION_SUCCESS_REDIRECT_URL,
    failureRedirect: _constants.LITERALS_AUTHENTICATION_CONTROLLER.AUTHENTICATION_FAILURE_REDIRECT_URL,
});