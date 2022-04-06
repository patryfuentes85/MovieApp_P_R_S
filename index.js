
// Módulos externos
const express = require('express') // importando la módulo NPM express
require('./utils/utils_films.js')
require('./utils/scrapy');
require("dotenv").config(); //archivo para proteger contraseñas
require('./utils/dbMongo');
const morgan = require('morgan')


const app = express() // Inicializa el servidor. App es un bjeto que representa el server
const port = 3000

// Rutas
const filmsRouter = require('./routes/routes_films.js');
//const res = require('express/lib/response');

// Motor de vistas Pug
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.json()); // Para habilitar recepción de datos JSON en una request
app.use(morgan('tiny'));

app.use("/",filmsRouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

 // module.exports = server;