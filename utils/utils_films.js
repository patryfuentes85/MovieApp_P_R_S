const fetch = require("node-fetch");
const api_key = process.env.API_KEY;

//http://localhost:3000/search
const getDefaultList = async () => {
  try {
    let response = await fetch(
      "https://www.omdbapi.com/?s=hulk&apikey=d2e38c67"
    ); // []
    let films = await response.json(); // []
    return films;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
};

//http://localhost:3000/search/:title
const getListByTitle = async (title) => {
  try {
    let response = await fetch(
      `https://www.omdbapi.com/?s=${title}&apikey=d2e38c67`
    ); // []
    let films = await response.json(); // []
    //console.log(films);
    return films;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
};

const getOneByTitle = async (title) => {
  try {
    let response = await fetch(
      `https://www.omdbapi.com/?t=${title}&apikey=d2e38c67`
    ); // []
    let films = await response.json(); // []
    //console.log(films);
    return films;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
};

const films = {
  getListByTitle,
  getDefaultList,
  getOneByTitle
};
module.exports = films;
