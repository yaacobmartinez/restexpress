const express = require('express')
const jwt = require('jsonwebtoken')


exports.verifyJWT = async function(req, res, next){
    try {
        var token = req.headers['access_token']
        if(!token){ return res.status(401).json({success: false, message: 'Unauthorized Access'})}
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(err) return res.status(500).json({success: false, message: 'Unauthorized Access'})
            res.verified = true
            res._id = decoded.id 
            return res    
        })
    } catch (error) {
        return res.status(500).json({success: false, message: 'Uh oh something wrong happened.'})
    }
    next()
}