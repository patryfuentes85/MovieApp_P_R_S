
// Módulos externos
const express = require('express') // importando la módulo NPM express
require('./utils/utils_films.js')
// require('./utils/scrapy');
require("dotenv").config(); //archivo para proteger contraseñas
require('./utils/dbMongo');
require('./utils/passport-setup.js');
const passport = require('passport');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const cors = require('cors');

const app = express() // Inicializa el servidor. App es un bjeto que representa el server
const port = 3000

app.use(cors());

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

// ************  Google auth  ************** //

// For an actual app you should configure this with an experation time, better keys, proxy and secure
// app.use(cookieSession({
//   name: 'moviesClient-session',
//   keys: ['key1', 'key2']
// }))

// Auth middleware that checks if the user is logged in
// const isLoggedIn = (req, res, next) => {
//   if (req.user) {
//       next();
//   } else {
//       res.sendStatus(401);
//   }
// }

// // Initializes passport and passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

// // Auth Routes
// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// // In this route you can see that if the user is logged in u can acess his info in: req.user
// app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

// app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/good');
//   }
// );

// app.get('/logout', (req, res) => {
//     req.session = null;
//     req.logout();
//     res.redirect('/');
// })




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

 //module.exports = server;