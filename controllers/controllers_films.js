/**
 * @author Sergio_Patricia_Ricardo 
 * @exports film 
 * @namespace controllersFilms
 */

const films = require("../utils/utils_films");
const Movie = require("../models/models_films");
const scrap1 = require("../utils/scrapySensacine.js");
const scrap2 = require("../utils/scrapyFilmaffinity.js");

const { db } = require("../models/models_films");

/**
  * Description: This Function get Films from BBDD
  * @memberof controllersFilms
  * @method getFilms
  * @async 
  * @param {String} title film title
  * @return {Object} Return Movies from BBDD
  * @throws {error} Error de consulta a la BBDD
  */

const getFilms = async (req, res) => {
  console.log(req.query.title);
  try {
    if (req.query.title) {
      let info = await films.getListByTitle(req.query.title);
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

/**
  * Description: This Function get one film by title with scraping from APi
  * @memberof controllersFilms
  * @method getFilmByTitle
  * @async 
  * @param {String} title film title
  * @return {Object} Return Movie with details
  * @throws {error} Error de consulta
  */

const getFilmByTitle = async (req, res) => {
  try {
  let peli = req.params.title;
  console.log("entrada por url = " + req.params.title);
  let reviews1 = await scrap1.scrapeamedesensacine(peli);
  console.log(reviews1);
  let rev2 = [];
  reviews1.forEach((element) => {
    rev2.push(element.author);
    rev2.push(element.comment);
  });
  console.log(rev2);
    if(reviews1){
      let info = await films.getOneByTitle(req.params.title);
      res.render("search_one.pug", { films: info, revTwo: rev2 }); 
    }
  }catch (err) {
    res.redirect("/search");
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

/**
  * Description: This Function edit one film from BBDD
  * @memberof controllersFilms
  * @method editFilms
  * @async 
  * @param {String} title film title
  * @return {Object} Return Movie with edited details
  * @throws {error} Error de consulta
  */

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

/**
  * Description: This Function create one film and save in MongoDB Atlas
  * @memberof controllersFilms
  * @method createMovie
  * @async 
  * @param {Object} film object
  * @return {Object} Return New Movie with details
  * @throws {error} Error de consulta
  */
const createMovie = async (req, res) => {
  let coincidence = false;
  try {
    let data = await Movie.find({}, "-_id -__v");
    data.forEach(async (element) => {
      if (element.title == req.body.name) {
        coincidence = true;
        console.log(element.title);
      }
    });
    console.log(coincidence);
    if (coincidence == false) {
      const peli = new Movie({
        title: req.body.name,
        year: req.body.year,
        type: req.body.type,
        genre: req.body.genre,
        runtime: req.body.duration,
        director: req.body.director,
        cast: req.body.cast,
        resume: req.body.resume,
        rating: req.body.rating,
        poster: req.body.url,
      });
      const result = await peli.save();
      res.render("status200.pug", { data: result });
    } else {
      console.log("La película ya existe");
      res.redirect("/create");
    }
  } catch (err) {
    res.render("error400.pug", { error: err });
  }
};

// Get Create Film View
const getCreateFilm = async (req, res) => {
  try {
    let info = await films.getOneByTitle("titanic");
    res.render("create_movie.pug", { films: info });
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
};

// obtener movie desde la base de datos
const getAllMoviesMongo = async (req, res) => {
  try {
    let data = await Movie.find({}, "-_id -__v");
    // let film = res.status(200).json(data);
    res.render("movies_admin.pug", { films: data });
  } catch (err) {
    res.render("error400.pug", { error: err });
  }
};

const getOneMovieMongo = async (req, res) => {
  try {
    let data = await Movie.findOne({ title: req.params.title }, "-_id -__v");
    res.render("edit_movie.pug", { films: data });
  } catch (err) {
    res.render("error400.pug", { error: err });
  }
};
const getDeleteMovie = async (req, res) => {
  try {
    let data = await Movie.findOne({ title: req.params.title }, "-_id -__v");
    res.render("delete_movie.pug", { films: data });
  } catch (err) {
    res.render("error400.pug", { error: err });
  }
};
const deleteMovie = async (req, res) => {
  try {
    const removeMovie = req.params.title;
    data = await Movie.find({}, "-_id -__v");
    data.name;
    const result = await Movie.deleteOne({ title: removeMovie });
    res.render("status200delte.pug");
  } catch (err) {
    res.render("error400.pug", { error: err });
  }
};

const editMovie = async (req, res) => {
  try {
    let query = { title: req.params.title };
    let update = {
      year: req.body.year,
      type: req.body.type,
      genre: req.body.genre,
      runtime: req.body.duration,
      director: req.body.director,
      cast: req.body.cast,
      resume: req.body.resume,
      rating: req.body.rating,
      poster: req.body.url,
    };
    const result = await Movie.findOneAndUpdate(query, update, {
      new: true,
      runValidators: true,
    });
    res.render("status200.pug", { data: result });
  } catch (err) {
    res.render("error400.pug", { error: err });
  }
};

const film = {
  getCreateFilm,
  editFilms,
  getFilmByTitle,
  getFilms,
  createMovie,
  getAllMoviesMongo,
  deleteMovie,
  getFavorites,
  editMovie,
  getOneMovieMongo,
  getDeleteMovie,
};
module.exports = film;
