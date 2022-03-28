const films = require('../utils/utils_films')

const getFilms = async (req,res) => {
    // /film/:title
    let defaultFilm = req.params.title || "Titanic";
    try {
        if (req.params.title) {
        
            const movie = await films.getFilmByTitle(defaultFilm);
            console.log(movie);
            res.render("search_title.pug", { peli: movie });
        
        } /* else {
          
            const movie = await films.getDefaultFilm();
            console.log(movie);
            res.render("search_title.pug", { peli: movie });
        } */
    } 
    
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
      }
}


/* const film = {
    getFilms
}; */

module.exports = getFilms;