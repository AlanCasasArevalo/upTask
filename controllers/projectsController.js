const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');
const _constants = require('../src/config/constants');

exports.projectsHome = async (req, res) => {
    const projects = await Projects.findAll();
    res.render(_constants.LITERALS_PROJECTS_CONTROLLER.PAGE_HOME_NAME_RENDER, {
        pageName: _constants.LITERALS_PROJECTS_CONTROLLER.PAGE_NAME,
        projects
    });
};
exports.projectsNewProjects = async (req, res) => {
    const projects = await Projects.findAll();
    res.render(_constants.LITERALS_PROJECTS_CONTROLLER.PAGE_NEW_PROJECTS_NAME_RENDER, {
        pageName: _constants.LITERALS_PROJECTS_CONTROLLER.PAGE_NEW_PROJECTS_NAME,
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

    //Consultar tareas del proyecto actual
    const tasks = await Tasks.findAll({
        where: {
            ProjectId: project.id
        }
        // Con include te traes el proyecto al cual esta asignada la tarea
        // include: [
        //     { model: Projects }
        // ]
    });

    if (!project) return next();

    res.render(_constants.LITERALS_PROJECTS_CONTROLLER.PAGE_PROJECT_TASK_PROJECTS_RENDER, {
        pageName: _constants.LITERALS_PROJECTS_CONTROLLER.PAGE_PROJECT_TASK_PROJECTS_NAME,
        project,
        projects,
        tasks
    });
};


exports.newProject = async (req, res) => {
    const projects = await Projects.findAll();
    const name = req.body.name;

    let errors = [];

    if (!name) {
        errors.push({
            message: _constants.LITERALS_PROJECTS_CONTROLLER.NEW_PROJECT_ERROR_MESSAGE
        });
        console.log(errors);
    }

    if (errors.length > 0) {

        res.render(_constants.LITERALS_PROJECTS_CONTROLLER.PAGE_NEW_PROJECTS_NAME_RENDER, {
            pageName: _constants.LITERALS_PROJECTS_CONTROLLER.PAGE_NEW_PROJECTS_NAME,
            errors,
            projects
        })
    } else {
        // No hay errores
        // insertar en la base de datos
        const project = await Projects.create({
            name
        });

        // Esto es si en vez de querer renderizar un resultado queremos enviar json al front end
        // res.status(201).json({
        //     message: 'OK',
        //     project
        // });
        res.status(201).redirect('/');
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

    // Esto es si en vez de querer renderizar un resultado queremos enviar json al front end
    // res.status(202).json({
    //     message: 'OK',
    //     project,
    //     projects
    // });

    res.render(_constants.LITERALS_PROJECTS_CONTROLLER.PAGE_NEW_PROJECTS_NAME_RENDER, {
        pageName: _constants.LITERALS_PROJECTS_CONTROLLER.PAGE_PROJECT_EDIT_PROJECT_NAME,
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
            message: _constants.LITERALS_PROJECTS_CONTROLLER.UPDATE_PROJECT_NAME_ERROR_MESSAGE
        });
        console.log(errors);
    }

    if (errors.length > 0) {
        res.render(_constants.LITERALS_PROJECTS_CONTROLLER.PAGE_NEW_PROJECTS_NAME_RENDER, {
            pageName: _constants.LITERALS_PROJECTS_CONTROLLER.PAGE_NEW_PROJECTS_NAME,
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

        // Esto es si en vez de querer renderizar un resultado queremos enviar json al front end
        // res.status(202).json({
        //     message: 'OK',
        //     project,
        // });
        res.redirect('/');
    }
};

exports.deleteProjects = async (req, res, next) => {
    // console.log('parametros del delete', req);
    const { projectURL } = req.query;
    const result = await Projects.destroy({
        where: {
            url: projectURL
        }
    });

    // Si no se ha podido hacer el borrado del proyecto
    if (!result){
        return next()
    }

    // Esto es si en vez de querer renderizar un resultado queremos enviar json al front end
    // res.status(202).json({
    //     message: 'Proyecto borrado',
    // });
    res.send(_constants.LITERALS_PROJECTS_CONTROLLER.SUCCESS_DELETE_MESSAGE);
};

