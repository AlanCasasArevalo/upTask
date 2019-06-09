const Users = require('../models/Users');
const _constant = require('../src/config/constants');

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
            .then(() => {
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
    res.render(_constant.LITERALS_USER_CONTROLLER.LOGIN_PAGE_NAME_RENDER, {
        pageName: _constant.LITERALS_USER_CONTROLLER.LOGIN_PAGE_NAME
    })
};

exports.loginAccount = (req, res) => {
    res.render(_constant.LITERALS_USER_CONTROLLER.LOGIN_PAGE_NAME_RENDER, {
        pageName: _constant.LITERALS_USER_CONTROLLER.LOGIN_PAGE_NAME
    })
};
