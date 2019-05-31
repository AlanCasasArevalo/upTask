const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const helpers = require('./helpers/helpers');

// Modelo
require('./models/Projects');
require('./models/Tasks');

//Conexion base de datos
const db = require('./config/db');
db.sync()
    .then(() => {
        console.log("Conectado a la base de datos.");
    })
    .catch(error => console.log(error))

const app = express();
app.use(expressValidator());

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use((req, res, next) => {
    // con res.locals.vardump lo que hacemos es que se pueda acceder a vardump en cualquier archivo de la aplicacion
    res.locals.vardump = helpers.vardump;
    // Siguiente middleware es como un continue o break
    next();
});

app.use(bodyParser.urlencoded({extended: true}));

app.use('/',routes());

app.listen(3000);

module.exports = app;
