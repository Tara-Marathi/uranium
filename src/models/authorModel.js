const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    authorName: String, 
    author_id:{
        type:Number,
        unique:true
    },
    age: Number,
    address:String
}, { timestamps: true });


module.exports = mongoose.model('Author', authorSchema) //authors
