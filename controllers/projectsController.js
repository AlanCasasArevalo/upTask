const Projects = require('../models/Projects');

exports.projectsHome = async (req, res) => {
    const projects = await Projects.findAll();
    res.render('index', {
        pageName: "Projects",
        projects
    });
};
exports.projectsNewProjects = (req, res) => {
    res.render('newProjects', {
        pageName: "New project"
    });
};

exports.projectByUrl = (req, res) => {
    res.send('Listo')
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
        const project = await Projects.create({
            name
        });
        res.redirect('/');
    }

};
