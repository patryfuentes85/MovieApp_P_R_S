const films = require("../utils/utils_films");
const Movie = require("../models/models_films");
const user = require("../models/models_users.js");

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

// crear usuario en  sql

const createUser = async (req, res) => {
  try {
    let datos = await user.createUser(req.body);
    res.status(201).json(datos);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
};

// crear movie por el admin

const createMovie = async (req, res) => {
  try {
    const peli = new Movie(req.body);
    const result = await peli.save();

    console.log("Movie created");
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// obtener movie desde la base de datos

const getAllMovies = async (req,res) => {
    let data;
    try{
      data = await Movie.find({}, '-_id -__v')
      res.status(200).json(data)
    }catch(err){
        res.status(400).json({"error":err})
    } 
}




const film = {
  getFilmByTitle,
  getFilms,
  createMovie,
  getAllMovies,
  createUser
};
module.exports = film;
