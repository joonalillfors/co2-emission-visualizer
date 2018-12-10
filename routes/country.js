const router = require('express').Router()
const db = require('../database/database')

// Bad solution to filter out biggest areas
function filterCountries(obj) {
    return obj.filter(c => !c.Country.includes('Asia') &&
                    !c.Country.includes('IDA') &&
                    !c.Country.includes('ividend') &&
                    !c.Country.includes('Euro') &&
                    !c.Country.includes('World') &&
                    !c.Country.includes('IBRD') &&
                    !c.Country.includes('income') &&
                    !c.Country.includes('North') &&
                    !c.Country.includes('OECD') &&
                    !c.Country.includes('merica') &&
                    !c.Country.includes('ahar') &&
                    !c.Country.includes('countries') &&
                    !c.Country.includes('conflict'))
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