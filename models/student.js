const mongoose = require('mongoose')


const StudentSchema = new mongoose.Schema({
    studentId :{
        type : String, 
        minlength: [12, `Invalid Student Number`], 
        maxlength: [12, `Invalid Student Number`], 
        required:[true, `Your Student ID is required.`], 
    },
    first_name :{
        type: String, 
        minlength : 2, 
        maxlength : 30,
        required: [true, `What's your first name?`]
    },
    last_name :{
        type: String, 
        minlength : 2, 
        maxlength : 30,
        required: [true, `What's your last name?`]
    },
    year_level :{
        type: Number, 
        minlength : 1, 
        maxlength : 1, 
        required: [true, `What year are you on?`]
    },
    course :{
        type: String,
        minlength: 3, 
        maxlength: 4,
        required: [true, `What course are you taking?`], 
    },
    date_created :{
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('student', StudentSchema, 'students')