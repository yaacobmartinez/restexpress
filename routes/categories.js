const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/categories')
const JWTController = require('../controllers/jwt_controller')
const verifyJWT = JWTController.verifyJWT

router.get('/', verifyJWT, CategoryController.getAll)
router.post('/', verifyJWT, CategoryController.add)
router.get('/:id', [verifyJWT, CategoryController.getCategoryById], CategoryController.getCategory)
router.patch('/:id', [verifyJWT, CategoryController.getCategoryById], CategoryController.updateCategory)
router.delete('/:id', [verifyJWT, CategoryController.getCategoryById], CategoryController.deleteCategory)
module.exports = router