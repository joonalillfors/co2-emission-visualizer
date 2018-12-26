const router = require('express').Router()
const db = require('../database/database')

// Filter out biggest areas that aren't countries
function filterCountries(obj) {
    const regex = new RegExp(`Asia|IDA|ividend|Euro|World|IBRD|income|North|OECD|merica|ahar|countries|conflict`)
    return obj.filter(c => !regex.test(c.Country))
}

router.get('/biggest/:year', async (req, res) => {
    const result = await db.getHighestEmitters(req.params.year)
    res.json(filterCountries(result))
})

router.get('/cumulative', async (req, res) => {
    const result = await db.getCumulativeEmissions()
    res.json(filterCountries(result))
})

router.get('/cumulative/:id', async (req, res) => {
    res.json(await db.getCumulativeCountry(req.params.id.toUpperCase()))
})

router.get('/cumulativecapita', async (req, res) => {
    const result = await db.getCumulativePerCapita()
    res.json(filterCountries(result))
})

router.get('/populations', async (req, res) => {
    res.json(await db.getPopulations())
})

router.get('/emissions', async (req, res) => {
    res.json(await db.getEmissions())
})

router.get('/:id', async (req, res) => {
    res.json(await db.getDataByCountry(req.params.id.toUpperCase()))
})

router.get('/', async (req, res) => {
    const countryObject = await db.getCountries()
    res.json(countryObject.map(c => [c.Country, c.Code]))
})

module.exports = router