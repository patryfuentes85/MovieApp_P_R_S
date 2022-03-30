const films = require("../utils/utils_films");


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
const film = {
  getFilmByTitle,
  getFilms,
};
module.exports = film;
