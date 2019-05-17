const express = require('express');
const app = express();

app.use('/', (req, res) => {
   res.json('hola')
});

app.listen(3000);

module.exports = app;
