const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryName : {
        type: String, 
        minlength: 1,
        required: true
    },
    categoryDescription :{
        type : String, 
        maxlength: 255
    }
})

module.exports = mongoose.model('Category', CategorySchema, 'categories')