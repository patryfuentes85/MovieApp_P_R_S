const express = require("express");
const router = express.Router();
const contFilm = require("../controllers/controllers_films.js");
const contUser = require("../controllers/controllers_users.js");
const logAdmin = require("../middlewares/loginCorrectAdmin.js");
const logMember = require("../middlewares/loginCorrectMember.js");

router.get("/", (req, res) => {
  res.render("home.pug");
});

router.get("/search/:title?", logMember, contFilm.getFilms);
router.get("/searchone/:title?", logMember, contFilm.getFilmByTitle);
router.post("/searchone", logMember, contUser.logoutUser);


router.get("/create", logAdmin, contFilm.getCreateFilm);
router.post("/create", logAdmin, contFilm.createMovie);

router.post("/createUser", contUser.createUser);
router.get("/getUsers", contUser.getUsers);

router.post("/login", contUser.loginUser);
router.get("/login", async (req, res) => {
  res.render("login.pug");
});

router.post("/signup", contUser.createUser);
router.get("/signup", (req, res) => {
  res.render("signup.pug");
});

// router.get("/movies", contFilm.getAllMovies);
// router.delete("/removeMovie/:title", contFilm.deleteMovie);
// router.put("/editMovie/:id", contFilm.editMovie);

router.get("/dashboard", logMember, (req, res) => {
  res.render("dashboard.pug");
});
router.post("/dashboard", logMember, contUser.logoutUser);

router.get("/admin/:id?", logAdmin, contFilm.getAllMoviesMongo);
router.get("/myMovies/:title?", logMember, contFilm.getFavorites);

router.post("/admin", logAdmin, contUser.logoutUser);

router.get("/edit/:title", logAdmin, contFilm.getOneMovieMongo);
router.post("/edit/:title", logAdmin, contFilm.editMovie);

router.get("/edit/:title/delete", logAdmin, contFilm.getDeleteMovie);
router.post("/edit/:title/delete", logAdmin, contFilm.deleteMovie);

router.post("/recoverpassword", (req, res) => {
  res.render("recover.pug");
});

router.get("/restorepassword", (req, res) => {
  res.render("home.pug");
});

module.exports = router;
