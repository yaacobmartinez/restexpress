const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')
const JWTController = require('../controllers/jwt_controller')
const verifyJWT = JWTController.verifyJWT

router.get('/', verifyJWT, UserController.getAll)
router.post('/register', UserController.register)
router.get('/:id', [verifyJWT, UserController.getUserById], UserController.getUser)
router.delete('/:id', [verifyJWT, UserController.getUserById], UserController.deleteUser)
router.patch('/:id', [verifyJWT, UserController.getUserById], UserController.updateUser)
router.post('/login', UserController.loginUser)
router.get('/profile/me', verifyJWT, UserController.me)
module.exports =  router