const router = require('express').Router()
const db = require('../database/database')

router.use('/countries', require('./country'))
router.use('/years', require('./years'))

module.exports = router