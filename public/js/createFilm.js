function createFilmObject() {
  const signupName = document.querySelector(".edit__input__name").value;
  const signupYear = document.querySelector(".edit__input__year").value;
  const signupType = document.querySelector(".edit__input__type").value;
  const signupGenre = document.querySelector(".edit__input__genre").value;
  const signupDuration = document.querySelector(".edit__input__duration").value;
  const signupDirector = document.querySelector(".edit__input__director").value;
  const signupCast = document.querySelector(".edit__input__cast").value;
  const signupResume = document.querySelector(".edit__input__resume").value;
  const signupRating = document.querySelector(".edit__input__rating").value;
  const signupUrl = document.querySelector(".edit__input__url").value;
  const newFilm = {
    title: `${signupName}`,
    year: `${signupYear}`,
    type: `${signupType}`,
    genre: `${signupGenre}`,
    runtime: `${signupDuration}`,
    director: `${signupDirector}`,
    cast: `${signupCast}`,
    resume: `${signupResume}`,
    rating: `${signupRating}`,
    poster: `${signupUrl}`,
  };
  console.log(newFilm);
  return newFilm;
}

// module.exports = {
//   createFilmObject
// }
