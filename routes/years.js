const router = require('express').Router()
const db = require('../database/database')

router.get('/', async (req, res) => {
    res.json(await db.getYearRange())
})

router.get('/max', async (req, res) => {
    res.json(await db.getMaxYear())
})

router.get('/min', async (req, res) => {
    res.json(await db.getMinYear())
})

module.exports = router