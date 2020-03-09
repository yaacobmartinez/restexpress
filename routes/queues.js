const express = require('express')
const router = express.Router()
const QueueController = require('../controllers/queue')
const JWTController = require('../controllers/jwt_controller')
const verifyJWT = JWTController.verifyJWT

router.get('/', verifyJWT, QueueController.getAll)
router.post('/', QueueController.add)
router.get('/:id', [verifyJWT, QueueController.getTransactionByNumber], QueueController.getTransaction)
router.patch('/attend/:id', [verifyJWT, QueueController.getTransactionByNumber], QueueController.attend)
router.patch('/finish/:id', [verifyJWT, QueueController.getTransactionByNumber], QueueController.finish)

module.exports = router

