const express = require('express')
const mongoose = require('mongoose')


const activity = new mongoose.Schema({
    user : {
        type : String,
        required : true
    },
    activity : {
        type : String,
        max : 2048,
        required : true,
    },
    object: {
        type: String,
        required: true  
    },
    IP : {
        type: String, 
        required: true
    },
    date_of_activity: {
        type : Date, 
        required : true, 
        default : Date.now
    }
})

module.exports = mongoose.model('activity_logs', activity)