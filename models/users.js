const express = require('express')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    // _id: Object,
    first_name:{
        type: String,
        required:true,
        min: 2, 
        max: 2048
    },
    last_name:{
        type: String,
        required:true,
        min: 2, 
        max: 2048
    },
    username: {
        type: String,
        required:true,
        min: 8, 
        max: 30
    },
    password:{
        type: String,
        required:true,
        min: 8
    },
    date_created:{
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('User', userSchema)