const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
module.exports = function () {
    router.get('/', projectsController.projectsHome);
    router.get('/new-projects', projectsController.projectsNewProjects);
    return router;
};

