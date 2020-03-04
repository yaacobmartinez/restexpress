const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.get('/', async (req, res)=>{
    try {
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
    // res.json('POST REQUEST HERE');
    const user = new User({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        username : req.body.username,
        password : req.body.password,
    })
    try {
        const newUser = await user.save();
        res.status(200).json({success:true, message: `User ${req.body.username} saved.` })
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }

})

router.patch('/:id', getUser, async (req, res)=>{
    
    if(req.body.first_name != null){ res.user.first_name = req.body.first_name }
    if(req.body.last_name != null){ res.user.first_name = req.body.last_name }
    if(req.body.username != null){ res.user.first_name = req.body.username }
    if(req.body.password != null){ res.user.first_name = req.body.password }

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