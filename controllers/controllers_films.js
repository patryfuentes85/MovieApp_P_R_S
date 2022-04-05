const films = require("../utils/utils_films");
const Movie = require("../models/models_films");
// const adminCreateFilm = require("../public/js/createFilm.js");
const { db } = require("../models/models_films");

// obtener pelis

const getFilms = async (req, res) => {
  console.log(req.params.title);
  try {
    if (req.params.title) {
      let info = await films.getListByTitle(req.params.title);
      res.render("search_title.pug", { films: info });
    } else {
      let info = await films.getDefaultList();
      res.render("search_title.pug", { films: info });
    }
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
};

// obtener peli por titulo

const getFilmByTitle = async (req, res) => {
  console.log("entrada por url = " + req.params.title);
  try {
    let info = await films.getOneByTitle(req.params.title);
    res.render("search_one.pug", { films: info });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
};
//cambiar api a la de la base de datos favorites
const getFavorites = async (req, res) => {
  console.log(req.params.title);
  try {
    if (req.params.title) {
      let info = await films.getListByTitle(req.params.title);
      res.render("my_movies.pug", { films: info });
    } else {
      let info = await films.getDefaultList();
      res.render("my_movies.pug", { films: info });
    }
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
};
//cambiar api a la de la base de datos admin_movies
const getAdminFilms = async (req, res) => {
  console.log(req.params.title);
  try {
    let info = await films.getOneByTitle(req.params.title);
    res.render("movies_admin.pug", { films: info });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
};
//Editar entradas
const editFilms = async (req, res) => {
  console.log(req.params.title);
  try {
    let info = await films.getOneByTitle("titanic");
    res.render("edit_movie.pug", { films: info });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
};

// crear movie por el admin
const createMovie = async (req, res) => {
  try {
    // console.log(req.body.year)
    // const data = req.body.name;
    // console.log(data);
    const peli = new Movie({
      "title": req.body.name,
      "year": req.body.year,
      "type": req.body.type,
      "genre": req.body.genre,
      "runtime": req.body.duration,
      "director": req.body.director,
      "cast": req.body.cast,
      "resume": req.body.resume,
      "rating": req.body.rating,
      "poster": req.body.url,
    });
    const result = await peli.save();
    console.log("Movie created");
    console.log(result);
    res.status(201).json(result);
    // res.redirect("/create")
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

// Get Create Film View
const createFilm = async (req, res) => {
  try {
    let info = await films.getOneByTitle("titanic");
    res.render("create_movie.pug", { films: info });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
};
// obtener movie desde la base de datos
const getAllMovies = async (req, res) => {
  let data;
  try {
    data = await Movie.find({}, "-_id -__v");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const removeMovie = req.params.title; // {} nuevo producto a guardar
    const result = await Movie.deleteOne({ title: removeMovie });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const editMovie = async (req, res) => {
  try {
    const result = await Movie.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "succes",
      data: { result },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "error",
    });
  }
};

const film = {
  createFilm,
  editFilms,
  getFilmByTitle,
  getFilms,
  createMovie,
  getAllMovies,
  deleteMovie,
  getFavorites,
  getAdminFilms,
  editMovie,
};
module.exports = film;
