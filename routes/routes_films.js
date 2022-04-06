const express = require("express");
const router = express.Router();
const contFilm = require("../controllers/controllers_films.js");
const contUser = require("../controllers/controllers_users.js");

router.get("/", (req, res) => {
  res.render("home.pug");
});

router.get("/search/:title?", contFilm.getFilms);
router.get("/searchone/:title?", contFilm.getFilmByTitle);

router.get("/create", contFilm.getCreateFilm);
router.post("/create", contFilm.createMovie);

router.post("/createUser", contUser.createUser);
router.get("/getUsers", contUser.getUsers);

router.post("/login", contUser.loginUser);
router.get("/login", (req,res) => {
  res.render("login.pug");
})

router.post("/signup", contUser.createUser);
router.get("/signup", (req, res) => {
  res.render("signup.pug");
});

// router.get("/movies", contFilm.getAllMovies);
// router.delete("/removeMovie/:title", contFilm.deleteMovie);
// router.put("/editMovie/:id", contFilm.editMovie);

router.get("/dashboard", (req, res) => {
  res.render("dashboard.pug");
});
router.get("/admin/:id?", contFilm.getAllMoviesMongo);
router.get("/myMovies/:title?", contFilm.getFavorites);



router.post("/logout", (req, res) => {
  res.render("home.pug");
});

router.get("/edit/:title", contFilm.getOneMovieMongo);
router.post("/edit/:title", contFilm.editMovie);

router.get("/edit/:title/delete", contFilm.getDeleteMovie);
router.post("/edit/:title/delete", contFilm.deleteMovie);

router.get("/recoverpassword", (req, res) => {
  res.render("home.pug");
});
router.get("/restorepassword", (req, res) => {
  res.render("home.pug");
});

module.exports = router;