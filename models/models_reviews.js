const mongoose = require('mongoose');

const reviewSchema = {
    title: {
        type: String, 
        required: true 
    },
    author: {
        type: String, 
        required: true 
    },
    reviewBody: {
        type: String, 
        required: true 
    }
};

const reviewsSchema = mongoose.Schema(reviewSchema);
const review = mongoose.model('Review', reviewsSchema);

module.exports = review;