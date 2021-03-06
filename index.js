const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const helpers = require('./helpers/helpers');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
global._constants = require('./src/config/constants');

// Modelo
require('./models/Projects');
require('./models/Tasks');
require('./models/Users');

//Conexion base de datos
const db = require('./config/db');

db.sync()
    .then(() => {
        console.log("Conectado a la base de datos.");
    })
    .catch(error => console.log(error));

const app = express();
app.use(express.static('public'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());


app.set('views', path.join(__dirname, './views'));

app.use(flash());
app.use(cookieParser());

// Sessions nos permite navegar entre paginas sin re autenticar
app.use(session({
    secret: _constants.MAIN_INDEX_LITERALS.SESSION_SECRET_SEED,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    // con res.locals.vardump lo que hacemos es que se pueda acceder a vardump en cualquier archivo de la aplicacion
    res.locals.vardump = helpers.vardump;
    res.locals.messages = req.flash();
    res.locals.user = {...req.user} || null;
    console.log('res.locals.user', res.locals.user)
    // Siguiente middleware es como un continue o break
    next();
});

app.use('/',routes());

app.listen(3000);

module.exports = app;
