const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/', verifyJWT, async (req, res)=>{
    try {
        const users = await User.publicUsers.find()
        res.json(users);    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', [getUser, verifyJWT], (req, res)=>{
    res.json(res.user)
})

router.post('/', async (req, res)=>{
    const userExists = await User.allUser.findOne({username: req.body.username})
    if(userExists){ return res.status(500).json({success:false, message: `Username ${req.body.username} already exists.`})}
        const user = new User({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password, 10)
        })
        try {
            const newUser = await user.save();
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            console.log(hashedPassword)
            res.status(200).json({success:true, message: `User ${req.body.username} saved.` })
        } catch (error) {
            res.status(500).json({success:false, message: error.message})
        }
    
})

router.patch('/:id', getUser, async (req, res)=>{
    
    if(req.body.first_name != null){ res.user.first_name = req.body.first_name }
    if(req.body.last_name != null){ res.user.last_name = req.body.last_name }
    if(req.body.username != null){ res.user.username = req.body.username }
    if(req.body.password != null){ res.user.password = bcrypt.hashSync(req.body.password, 10) }

    try {
        const updatedUser = await res.user.save();
        res.json({success: true, message: `User ${updatedUser._id} updated`})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
})
router.delete('/:id', getUser, async (req, res)=>{
    try {
        await res.user.remove()
        res.json({success: true, message : `User ${res.user.username} Removed`})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
})

router.post('/login', async(req, res)=>{
    const user = await User.allUser.findOne({username : req.body.username})
    // return res.json(user);
    if(!user){return res.status(500).json({success:false, message: "Invalid Login"})}
    let isCorrectPassword = await bcrypt.compare(req.body.password , user.password)
    if(!isCorrectPassword){return res.status(500).json({success: false, message: "Invalid Login"})}
    var token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {  expiresIn: 86400  });
    return res.json({success:true, message: `Login Valid`, token: token})
})

router.get('/profile/me', verifyJWT, async(req, res)=>{
    const id = res._id
    const user = await User.publicUsers.findById(id);
    res.json(user)
})

async function getUser(req, res, next) {
    try {
      user = await User.publicUsers.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cant find User'})
      }
    } catch(err){
      return res.status(500).json({ message: 'Cant find User' })
    }
    res.user = user
    next()
  }

async function verifyJWT(req, res, next) {
    try {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ success:false, auth: false, message: 'Unauthorized Access.' });
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (err) return res.status(500).send({ success: false, auth: false, message: 'Failed to Authenticate. Please login again.' }); 
            // res.status(200).json({success:true, user: decoded.id});
             res.verified = true
             res._id = decoded.id
             return res
            
        });
    } catch(err){
      return res.status(500).json({ message: 'Uh oh, this was not supposed to happen.' })
    }
    next()
  }

module.exports = router