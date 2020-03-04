const express = require('express')
const router = express.Router()
const User = require('../models/users')
// const readUser = require('../models/readUser')
const bcrypt = require('bcryptjs')

router.get('/', async (req, res)=>{
    try {
        // const users = await readUser.find()
        const users = await User.find()
        res.json(users);    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', getUser, (req, res)=>{
    res.json(res.user)
})

router.post('/', async (req, res)=>{
    const userExists = await User.findOne({username: req.body.username})
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
    const user = await User.findOne({username : req.body.username})
    // return res.json(user);
    if(!user){return res.status(500).json({success:false, message: "Invalid Login"})}
    let isCorrectPassword = await bcrypt.compare(req.body.password , user.password)
    if(!isCorrectPassword){return res.status(500).json({success: false, message: "Invalid Login"})}
    return res.json({success:true, message: `Login Valid`})
})

async function getUser(req, res, next) {
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cant find User'})
      }
    } catch(err){
      return res.status(500).json({ message: 'Cant find User' })
    }
    res.user = user
    next()
  }

module.exports = router