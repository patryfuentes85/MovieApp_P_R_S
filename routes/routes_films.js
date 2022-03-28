const express = require("express");
const router = express.Router();
const contFilm = require("../controllers/controllers_films.js");

router.get("/", (req, res) => {
  res.render("home.pug");
});

router.get("/search/:title?", async (req, res) => {
  console.log(req.params.title);
  try {
    if (req.params.title) {
      let info = await contFilm.getFilmsByTitle(req.params.title);
      res.render("search_title.pug", { films: info });
    } else {
      let info = await contFilm.getDefaultFilms();
      res.render("search_title.pug", { films: info });
    }
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
});

router.get("/search/one/:title?", async (req, res) => {
  console.log("entrada por url = " + req.params.title);
  try {
      let info = await contFilm.getFilmByTitle(req.params.title);
      res.render("search_one.pug", { films: info });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
});

router.get("/dashboard", (req, res) => {
  res.render("home.pug");
});

router.get("/movies", (req, res) => {
  res.render("home.pug");
});
router.post("/signup", (req, res) => {
  res.render("home.pug");
});
router.post("/login", (req, res) => {
  res.render("home.pug");
});
router.post("/logout", (req, res) => {
  res.render("home.pug");
});
router.post("/createMovie", (req, res) => {
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
