const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const _constants = require('../src/config/constants');

// Referencia al modelo donde vamos a autenticar
const Users = require('../models/Users');

passport.use(
    new LocalStrategy(
        // Por defecto passport espera usuario y password
        {
            usernameField: _constants.PASSPORT_LITERALS.USER_NAME_FIELD,
            passwordField: _constants.PASSPORT_LITERALS.PASSWORD_FIELD
        },
        async (email, password, done) => {
            try {
                const user = await Users.findOne({
                    where: {
                        email,
                        active: 1
                    }
                });
                // El usuario existe pero el password no coincide
                if (!user.passwordVerification(password)) {
                    return done(null, false, {
                        message: _constants.PASSPORT_LITERALS.DONE_MESSAGE_CALLBACK_INCORRECT_PASSWORD
                    })
                } else {
                    // El usuario y la contraseña es correcto y lo devolvemos.
                    return done (null, user)
                }

            }catch (error) {
                // Este usuario no existe
                return done(null, false, {
                    message: _constants.PASSPORT_LITERALS.DONE_MESSAGE_CALLBACK_USER_DOES_NOT_EXISTS
                })
            }
        }
    )
);

// Serializar el usuario
passport.serializeUser((user, callback) => {
   callback(null, user);
});

// Deserializar el usuario
passport.deserializeUser((user, callback) => {
   callback(null, user);
});

module.exports = passport;
