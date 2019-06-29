const Users = require('../models/Users');
const _constant = require('../src/config/constants');
const sendEmail = require('../handlers/mail');

exports.formCreateAccount = (req, res) => {
    res.render(_constant.LITERALS_USER_CONTROLLER.PAGE_NAME_RENDER, {
        pageName: _constant.LITERALS_USER_CONTROLLER.PAGE_NAME
    })
};

exports.createAccount = async (req, res) => {
    const {email, password} = req.body;

    if (email && typeof email !== 'undefined' && password && typeof password !== 'undefined') {

        try {
            await Users.create({
                email,
                password
            })
            .then(async () => {
                //crear url de confirmacion
                const confirmUrl = `http://${req.headers.host}${_constant.INDEX_ROUTES_LITERALS.CONFIRM_URL}/${email}`;
                // crear objeto de usuario real

                const user = {
                    email
                };
                // enviar email
                await sendEmail.toSendMail({
                    from: '👻 UpTask <no-reply@uptask.com>',
                    to : user.email,
                    subject: 'Confirma tu cuenta de Uptask',
                    file: 'confirmYourAccount',
                    confirmUrl,
                });

                //redirigir al usuario
                req.flash('correcto', 'Te hemos enviado un correo por favor confirma tu cuenta');
                res.redirect(_constant.LITERALS_USER_CONTROLLER.REDIRECTION_USER_CREATED)
            })
        } catch (errors) {
            req.flash('error', errors.errors.map(error => error.message));
            res.render(_constant.LITERALS_USER_CONTROLLER.PAGE_NAME_RENDER, {
                messages: req.flash(),
                pageName: _constant.LITERALS_USER_CONTROLLER.PAGE_NAME,
                email,
                password
            })
        }

    } else {
        res.redirect('/')
    }

};

exports.formLogin = (req, res) => {
    const { error } = res.locals.messages
    res.render(_constant.LITERALS_USER_CONTROLLER.LOGIN_PAGE_NAME_RENDER, {
        pageName: _constant.LITERALS_USER_CONTROLLER.LOGIN_PAGE_NAME,
        error
    })
};

exports.loginAccount = (req, res) => {
    res.render(_constant.LITERALS_USER_CONTROLLER.LOGIN_PAGE_NAME_RENDER, {
        pageName: _constant.LITERALS_USER_CONTROLLER.LOGIN_PAGE_NAME
    })
};

exports.confirmAccount = async (req, res) => {
    const email = req.params.email;
    const user = await Users.findOne({
        where: {
            email
        }
    });

    if (user && typeof user !== 'undefined'){
        user.active = 1;
        const userUpdate = await user.save();
        if (userUpdate && typeof userUpdate !== 'undefined') {
            req.flash('correcto', 'Cuenta activada correctamente');
            res.redirect(_constant.INDEX_ROUTES_LITERALS.LOGIN_ACCOUNT)
        } else {
            req.flash('error', 'Error al guardar');
            res.redirect(_constant.INDEX_ROUTES_LITERALS.USER_CREATE_NEW_ACCOUNT)
        }

    } else {
        req.flash('error', 'No valido');
        res.redirect(_constant.INDEX_ROUTES_LITERALS.USER_CREATE_NEW_ACCOUNT)
    }
};

// Funcion para reiniciar contraseña
exports.formResetAccountPassword = (req, res, next) => {
    res.render(_constant.LITERALS_USER_CONTROLLER.RESET_ACCOUNT_RENDER, {
        pageName: _constant.LITERALS_USER_CONTROLLER.RESET_ACCOUNT_PAGE_NAME
    })
};