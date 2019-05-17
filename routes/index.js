const express = require('express');
const router = express.Router();

module.exports = function () {
    router.get('/', (req, res) => {
        res.json('Index');
    });

    router.get('/us', (req, res) => {
       res.json('us');
    });
    return router;
};

