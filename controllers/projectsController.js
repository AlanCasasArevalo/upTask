const Projects = require('../models/Projects');

exports.projectsHome = async (req, res) => {
    const projects = await Projects.findAll();
    res.render('index', {
        pageName: "Projects",
        projects
    });
};
exports.projectsNewProjects = async (req, res) => {
    const projects = await Projects.findAll();
    res.render('newProjects', {
        pageName: "New project",
        projects
    });
};

exports.projectByUrl = async (req, res, next) => {
    const projectsPromise = await Projects.findAll();

    const projectPromise = await Projects.findOne({
        where: {
            url: req.params.url
        }
    });
    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);


    if (!project) return next();
    res.render('tasks', {
        pageName: 'Project task',
        project,
        projects
    });
};


exports.newProject = async (req, res) => {
    const projects = await Projects.findAll();
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
            errors,
            projects
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

exports.editForm = async (req, res) => {
    const projectsPromise = await Projects.findAll();

    const projectPromise = await Projects.findOne({
        where: {
            id: req.params.id
        }
    });
    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    res.render('newProjects', {
        pageName: 'Edit project',
        project,
        projects
    })
};

exports.updateProjects = async (req, res) => {
    const projects = await Projects.findAll();
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
            errors,
            projects
        })
    } else {
        // No hay errores
        // insertar en la base de datos
        const project = await Projects.update(
            { name },
            { where: { id: req.params.id }}
        );
        res.redirect('/');
    }
};

exports.deleteProjects = async (req, res, next) => {
    console.log('parametros del delete', req);
    const { projectURL } = req.query;
    const result = await Projects.destroy({
        where: {
            url: projectURL
        }
    });
    res.send('Proyecto eliminado correctamente');
};

