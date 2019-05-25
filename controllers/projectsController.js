const Projects = require('../models/Projects');
const slug = require("slug");

exports.projectsHome = (req, res) => {
    res.render('Index', {
        pageName: "Projects"
    });
};
exports.projectsNewProjects = (req, res) => {
    res.render('newProjects', {
        pageName: "New project"
    });
};

exports.newProject = async (req, res) => {
    // console.log(req.body);
    // console.log(name);
    const name = req.body.name;

    let errors = [];

    if (!name) {
        errors.push({
            message: 'Tienes que agregar un nombre al campo'
        });
        console.log(errors);
    }

    if (errors.length > 0) {
        res.render('newProjects', {
            pageName: 'New project',
            errors
        })
    } else {
        // No hay errores
        // insertar en la base de datos
        const url = slug(name.toLowerCase());
        const project = await Projects.create({
            name,
            url
        });
        res.redirect('/');
    }

};
