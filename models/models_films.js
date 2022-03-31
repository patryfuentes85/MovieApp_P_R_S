const mongoose = require('mongoose');

const filmSchema = {
    title: { 
        type: String, 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    director: { 
        type: String, 
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    runtime: { 
        type: String, 
        required: true 
    },
    poster:{
        type: String,
        validate: {
            validator: function(url){
                return url.indexOf('.jpg') != -1;
            }, 
            message: "Only JPG pictures"
        }
    }
};

const filmsSchema = mongoose.Schema(filmSchema);
const Movie = mongoose.model('Movie', filmsSchema);

module.exports = Movie;