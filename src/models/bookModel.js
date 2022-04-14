const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String, 
    author_id:Number,
    price: Number,
    ratings:Number
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //books

