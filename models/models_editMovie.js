const mongoose = require('mongoose');
const editSchema = {
    title: { 
        type: String 
    },
    year: { 
        type: Number 
    },
    type: { 
        type: String 
    },
    genre: { 
        type: String 
    },
    runtime: { 
        type: String 
    },
    director: { 
        type: String 
    },
    cast: { 
        type: String 
    },
    resume: { 
        type: String 
    },
    rating: { 
        type: Number
    },
    poster:{
        type: String,
        
    }
};

const editsSchema = mongoose.Schema(editSchema);
const SchemaEdit = mongoose.model('SchemaEdit', editsSchema);

module.exports = SchemaEdit;