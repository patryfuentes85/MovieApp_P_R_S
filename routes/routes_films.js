const express = require("express");
const router = express.Router();
const contFilm = require("../controllers/controllers_films.js");


router.get("/", (req, res) => {
  res.render("home.pug");
});

router.get("/search/:title?", contFilm.getFilms);
router.get("/searchone/:title?", contFilm.getFilmByTitle);
router.post("/createMovie", contFilm.createMovie);
router.post("/createUser", contFilm.createUser);


router.get("/dashboard", (req, res) => {
  res.render("home.pug");
});

router.get("/movies", (req, res) => {
  res.render("home.pug");
});
router.get("/signup", (req, res) => {
  res.render("signup.pug");
});
router.get("/login", (req, res) => {
  res.render("login.pug");
});
router.post("/logout", (req, res) => {
  res.render("home.pug");
});

router.put("/editMovie/:id?", (req, res) => {
  res.render("home.pug");
});
router.delete("/removeMovie", (req, res) => {
  res.render("home.pug");
});

router.get("/recoverpassword", (req, res) => {
  res.render("home.pug");
});
router.get("/restorepassword", (req, res) => {
  res.render("home.pug");
});

module.exports = router;
