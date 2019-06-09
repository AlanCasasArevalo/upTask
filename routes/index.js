const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const projectsController = require('../controllers/projectsController');
const tasksController = require('../controllers/tasksController');
const usersControllers = require('../controllers/usersControllers');
const _constants = require('../src/config/constants');

module.exports = function () {

    router.get(_constants.INDEX_ROUTES_LITERALS.GET_PROJECTS_HOME, projectsController.projectsHome);

    router.get(_constants.INDEX_ROUTES_LITERALS.GET_POST_NEW_PROJECTS, projectsController.projectsNewProjects);

    router.post(_constants.INDEX_ROUTES_LITERALS.GET_POST_NEW_PROJECTS,
        //Validacion de nombre, que no este vacio, que elimine los espacios al principio y final y que escape los caracteres extraños
        body('name').not().isEmpty().trim().escape(),
        projectsController.newProject
    );

    // Lista de projectos
    router.get(_constants.INDEX_ROUTES_LITERALS.GET_PROJECTS_BY_URL, projectsController.projectByUrl);

    router.get(_constants.INDEX_ROUTES_LITERALS.GET_EDIT_PROJECTS_BY_ID, projectsController.editForm);

    router.post(_constants.INDEX_ROUTES_LITERALS.POST_PROJECTS_BY_ID,
        body('name').not().isEmpty().trim().escape(),
        projectsController.updateProjects
    );

    // Eliminar proyecto
    router.delete(_constants.INDEX_ROUTES_LITERALS.DELETE_PROJECTS_BY_URL,
        projectsController.deleteProjects
    );

    //TASKS
    // Crear nueva tarea
    router.post(_constants.INDEX_ROUTES_LITERALS.POST_NEW_TASK_BY_PROJECT_URL,
        tasksController.addNewTask
    );

    //Actualizar tarea task
    // PUT reescribe el elemento que queremos actualizar mientras que path solo cambia una propiedad del elemento
    router.patch(_constants.INDEX_ROUTES_LITERALS.PATCH_TASK_BY_ID,
        tasksController.updateTask
    );

    //Borrar tarea task
    router.delete( _constants.INDEX_ROUTES_LITERALS.DELETE_TASK_BY_ID,
        tasksController.deleteTask
    );

    // Crear nueva cuenta
    router.get(_constants.INDEX_ROUTES_LITERALS.USER_CREATE_NEW_ACCOUNT,
        usersControllers.formCreateAccount
    );

    router.post(_constants.INDEX_ROUTES_LITERALS.USER_CREATE_NEW_ACCOUNT,
        usersControllers.createAccount
    );

    // Iniciar sesion
    router.get(_constants.INDEX_ROUTES_LITERALS.LOGIN_ACCOUNT,
        usersControllers.formLogin
    );

    router.post(_constants.INDEX_ROUTES_LITERALS.LOGIN_ACCOUNT,
        usersControllers.loginAccount
    );

    return router;
};

