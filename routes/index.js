const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const projectsController = require('../controllers/projectsController');
const tasksController = require('../controllers/tasksController');
const usersControllers = require('../controllers/usersControllers');

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

    //TASKS
    // Crear nueva tarea
    router.post('/projects/:url',
        tasksController.addNewTask
    );

    //Actualizar tarea task
    // PUT reescribe el elemento que queremos actualizar mientras que path solo cambia una propiedad del elemento
    router.patch('/tasks/:id',
        tasksController.updateTask
    );

    //Borrar tarea task
    router.delete('/tasks/:id',
        tasksController.deleteTask
    );

    // Crear nueva cuenta
    router.get('/create-account',
        usersControllers.formCreateAccount
    );

    router.post('/create-account',
        usersControllers.createAccount
    );

    return router;
};

