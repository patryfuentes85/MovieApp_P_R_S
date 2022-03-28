const films = require("../utils/utils_films");

const getDefaultFilms = async (title) => {
  try {
    const defaulFilms = await films.getDefaultList();
    return defaulFilms;
  } catch (err) {
    console.log("Error");
  }
};
const getFilmsByTitle = async (title) => {
  try {
    const getFilmsTitle = await films.getListByTitle(title);
    return getFilmsTitle;
  } catch (err) {
    console.log("Error");
  }
};

const getFilmByTitle = async (title) => {
  try {
    const getFilmsTitle = await films.getFilmByTitle(title);
    console.log(getFilmsTitle);
    return getFilmsTitle;
  } catch (err) {
    console.log("Error");
  }
};
const film = {
  getFilmByTitle,
  getDefaultFilms,
  getFilmsByTitle,
};
module.exports = film;
