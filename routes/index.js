const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/logs', require('./activityLogs'))
router.use('/students', require('./students'))
router.use('/categories', require('./categories'))
router.use('/queues', require('./queues'))

module.exports = router