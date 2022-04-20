
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
const user = require('./models/models_users')
const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";

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
app.use(cookieSession({
  name: 'MoviesApi-session',
  keys: ['key1', 'key2']
}))


// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.get('/auth/google/', passport.authenticate('google', { scope: ['profile', 'email'], prompt: "select_account" }));
app.get('/failed', (req, res) => res.send('You Failed to log in!'))



// Auth Routes


app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
 async function(req, res) {
   console.log("entra en la funcion");

    const users = await user.getUsers();
    const usuario = users.find((u) => {
      return u.email === req.user.emails[0].value;
    });
    if (usuario) {
      console.log("entra al if");
      const payload = {
        check: true,
        email: usuario.email
      };
      const token = jwt.sign(payload, accessTokenSecret, {
        expiresIn: "15m",
      });
      res.cookie("accesstoken", token, {
          httpOnly: true,
          sameSite: "strict",
        }).redirect('/dashboard');
    } 
    // falta el else --- para que genere un usuario nuevo con los datos que da google
   // falta añadir el midleware en la ruta del dashboard porque lo tuve que quitar para probar que me funcionaba el passport y el login con google 
  }
);




app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

 //module.exports = server;