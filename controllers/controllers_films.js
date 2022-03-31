const films = require("../utils/utils_films");
const Movie = require("../models/models_films");
const user = require("../models/models_users.js");

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

/* const getMovie = async (req,res) => {
    let data;
    try{
        if(req.params.id){
            data = await Product.findOne({'id': req.params.id}, '-_id -__v');
            res.status(200).json(data);
        } else{
            data = await Product.find({}, '-_id -__v')
            res.status(200).json({products:data})
        }
    }catch(err){
        res.status(400).json({"error":err})
    } 
} */

const film = {
  getFilmByTitle,
  getFilms,
  createMovie,
  createUser,
};
module.exports = film;
