const express = require('express')
const router = express.Router()
const StudentController = require('../controllers/students')
const JWTController = require('../controllers/jwt_controller')
const verifyJWT = JWTController.verifyJWT

router.get('/', verifyJWT, StudentController.getAll)
router.post('/register', StudentController.register)
router.get('/:id', StudentController.getStudentByID, StudentController.getStudent)
router.delete('/:id', [verifyJWT, StudentController.getStudentByID], StudentController.deleteStudent)
router.patch('/:id', [verifyJWT, StudentController.getStudentByID], StudentController.updateStudent)

module.exports = router