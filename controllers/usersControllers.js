const Users = require('../models/Users');


exports.formCreateAccount = (req, res) => {
    res.render('createAccount', {
        pageName: 'Crear nueva cuenta en Uptask'
    })
};

exports.createAccount = (req, res) => {
    const {email, password} = req.body;

    if (email && typeof email !== 'undefined' && password && typeof password !== 'undefined') {
        Users.create({
            email,
            password
        })
        .then(() => {
            res.redirect('/login')
        })
        .catch(() => {
            res.redirect('/')
        })
    } else {
        res.redirect('/')
    }

};
