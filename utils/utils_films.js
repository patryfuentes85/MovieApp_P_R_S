const fetch = require('node-fetch');
const api_key = process.env.API_KEY;


const getDefaultFilm = async () => {
    try {
        let response = await fetch('https://www.omdbapi.com/?t=hulk&apikey=d2e38c67'); // []
        let films = await response.json(); // []
        //console.log(films);
        return films;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        return [];
    }
}

//http://localhost:3000/search/:title

const getFilmByTitle = async (title) => {
    try {
        let response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=d2e38c67`); // []
        let films = await response.json(); // []
        //console.log(films);
        return films;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        return [];
    }
}


const films = {
    
 getFilmByTitle,
 getDefaultFilm
    
}
module.exports = films;