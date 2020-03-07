const express = require('express')
const router = express.Router()
const ActivityController = require('../controllers/activityLogs')
const JWTController = require('../controllers/jwt_controller')
const verifyJWT = JWTController.verifyJWT

router.get('/', verifyJWT ,ActivityController.getAll)
router.post('/', verifyJWT, ActivityController.Log)
module.exports = router