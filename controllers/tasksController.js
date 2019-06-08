const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');
const _constants = require('../src/config/constants');

exports.addNewTask = async (req, res, next) => {
    // con esto obtenemos el projecto actual
    const project = await Projects.findOne({
        where: {
            url: req.params.url
        }
    });
    const tasks = await Tasks.findAll();
    const name = req.body.name;
    // estado 0 = a false 1 = true
    const status = 0;
    const ProjectId = project.id;

    let errors = [];

    if (!name) {
        errors.push({
            message: _constants.LITERALS_TASKS_CONTROLLER.NEW_TASK_ERROR_MESSAGE
        });
        return next();
    }

    if (errors.length > 0) {
        res.render(_constants.LITERALS_TASKS_CONTROLLER.PAGE_NEW_TASK_NAME_RENDER, {
            pageName: _constants.LITERALS_TASKS_CONTROLLER.PAGE_NEW_TASK_NAME,
            errors,
            tasks
        })
    } else {
        // no hay errores
        // intentamos agregar en la base de datos
        const task = await Tasks.create({
            name,
            status,
            ProjectId
        });

        // Esto es si en vez de querer renderizar un resultado queremos enviar json al front end
        // res.status(201).json({
        //     message: 'OK',
        //     task,
        // });

        if (!name) {
            res.render(_constants.LITERALS_TASKS_CONTROLLER.PAGE_NEW_TASK_NAME_RENDER, {
                pageName: _constants.LITERALS_TASKS_CONTROLLER.PAGE_NEW_TASK_NAME,
                errors,
                tasks
            })
        } else {
            res.redirect(`/projects/${req.params.url}`);
        }

    }
};

exports.updateTask = async (req, res, next) => {
    const id = req.params.id;
    const task = await Tasks.findOne({
        where: {
            id: id
        }
    });

    //Cambiar estado
    let status = 0;
    if (task.status === status) {
        status = 1;
    }
    task.status = status;
    const result = await task.save();

    if (result && typeof result !== 'undefined') {
        res.status(202).send(_constants.LITERALS_TASKS_CONTROLLER.UPDATE_TASK_SUCCESS_MESSAGE_TO_SEND);
        // res.status(202).redirect(`/`);
    } else {
        res.status(500).send({
            message: _constants.LITERALS_TASKS_CONTROLLER.UPDATE_TASK_FAIL_MESSAGE_TO_SEND
        });
        return next()
    }
};


exports.deleteTask = async (req, res, next) => {
    const id = req.params.id;
    const result = await Tasks.destroy({
        where: {
            id: id
        }
    });

    if (result && typeof result !== 'undefined') {
        res.status(202).send(_constants.LITERALS_TASKS_CONTROLLER.DELETE_TASK_SUCCESS_MESSAGE_TO_SEND);
    } else {
        res.status(500).send({
            message: _constants.LITERALS_TASKS_CONTROLLER.DELETE_TASK_FAIL_MESSAGE_TO_SEND
        });
        return next()
    }
};







