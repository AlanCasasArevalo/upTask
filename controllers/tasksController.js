const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');

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
            message: 'Tiene que agregar un nombre al campo'
        });
        return next();
    }

    if (errors.length > 0) {
        res.render('newTasks', {
            pageName: 'New Task',
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
            res.render('newTasks', {
                pageName: 'New Task',
                errors,
                tasks
            })
        } else {
            res.redirect(`/projects/${req.params.url}`);
        }

    }

};







