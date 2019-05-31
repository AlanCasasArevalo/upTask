const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const projectsController = require('../controllers/projectsController');
const tasksController = require('../controllers/tasksController');
module.exports = function () {
    router.get('/', projectsController.projectsHome);

    router.get('/new-projects', projectsController.projectsNewProjects);

    router.post('/new-projects',
        //Validacion de nombre, que no este vacio, que elimine los espacios al principio y final y que escape los caracteres extraños
        body('name').not().isEmpty().trim().escape(),
        projectsController.newProject
    );

    // Lista de projectos
    router.get('/projects/:url', projectsController.projectByUrl);

    router.get('/projects/edit/:id', projectsController.editForm);

    router.post('/new-projects/:id',
        body('name').not().isEmpty().trim().escape(),
        projectsController.updateProjects
    );
    // Eliminar proyecto
    router.delete('/projects/:url',
        projectsController.deleteProjects
    );

    // Crear nueva tarea
    router.post('/projects/:url',
        tasksController.addNewTask
    );


    return router;
};

