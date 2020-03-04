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
        min: 6,
        max:2048,
        // select: false
    },
    date_created:{
        type: Date,
        required: true,
        default: Date.now
    }
})

const publicUserSchema = new mongoose.Schema({
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
        min: 6,
        max:2048,
        select: false
    },
})

// For seeing all 
const allUser = mongoose.model('User', userSchema, 'users')
// For seeing limited
const publicUsers = mongoose.model('Public', publicUserSchema, 'users')
module.exports={
    allUser:allUser, 
    publicUsers:publicUsers
};