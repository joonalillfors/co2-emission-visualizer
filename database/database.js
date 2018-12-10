const sqlite = require('sqlite3').verbose()

let db = null

// Connects the server into SQLite database, read only mode
async function connectDatabase() {
    db = new sqlite.Database('database/emissions.db', sqlite.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message)
        }
        console.log('Connected to the database')
    })
}

// Disconnects the server from SQLite database
function closeDatabase() {
    db.close()
}

// Helper function to make queries from the database
async function query(...args) {
    return new Promise((result, reject) => {
        db.all(...args, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                result(rows)
            }
        })
    })
}

// Get all data from table population
async function getPopulations() {
    return query('SELECT * FROM population', [])
}

// Get all data from table emission
async function getEmissions() {
    return query('SELECT * FROM emission', [])
}

// Get data of specific country from table population
async function getPopulationByCountry(id) {
    return query('SELECT * FROM population WHERE Code = ?', [id])
}

// Get data of specific country from table emission
async function getEmissionsByCountry(id) {
    return query('SELECT * FROM emission WHERE Code = ?', [id])
}

// Get country specific data which contains yearly populations and emissions
async function getDataByCountry(id) {
    return query(`SELECT emission.Country country, emission.Year year, emission.Value emissions, population.Value population
                    FROM emission
                    INNER JOIN population
                    ON emission.Year = population.Year
                    AND emission.Code = population.Code
                    WHERE emission.Code = ?`, [id])
}

// Get all distinct countries and country codes
async function getCountries() {
    return query('SELECT DISTINCT Country, Code FROM population', [])
}

// Get all years there are available data
async function getYearRange() {
    return query('SELECT DISTINCT Year FROM emission WHERE Value IS NOT NULL ORDER BY Year', [])
}

// Get the latest year that has available data
async function getMaxYear() {
    return query('SELECT DISTINCT MAX(Year) Year FROM emission WHERE Value IS NOT NULL ', [])
}

// Get the earliest year that has available data
async function getMinYear() {
    return query('SELECT DISTINCT MIN(Year) Year FROM emission WHERE Value IS NOT NULL ', [])
}

// Get emissions from a specified year
async function getHighestEmitters(year) {
    return query('SELECT * FROM emission WHERE Year = ? ORDER BY Value DESC', [year])
}

// Get cumulative emissions of each country from 1992 to latest year
// 1992 because most countries have data from that year onwards
// Ordered by cumulative emissions
async function getCumulativeEmissions() {
    return query(`SELECT emission.Country Country, emission.Code Code, SUM(emission.Value)/1000000 Emission, 1000*SUM(emission.Value)/AVG(population.Value) Capita, MAX(emission.Year) Max, MIN(emission.Year) Min
                        FROM emission
                        INNER JOIN population
                        WHERE emission.Value IS NOT NULL
                        AND emission.Year > 1991
                        AND emission.Code = population.Code
                        AND emission.Year = population.Year
                        GROUP BY emission.Code
                        ORDER BY Emission DESC`, [])
}

// Same as Cumulative Emissions but ordered by emissions per capita
async function getCumulativePerCapita() {
    return query(`SELECT emission.Country Country, emission.Code Code, SUM(emission.Value)/1000000 Emission, 1000*SUM(emission.Value)/AVG(population.Value) Capita, MAX(emission.Year) Max, MIN(emission.Year) Min
                        FROM emission
                        INNER JOIN population
                        WHERE emission.Value IS NOT NULL
                        AND emission.Year > 1991
                        AND emission.Code = population.Code
                        AND emission.Year = population.Year
                        GROUP BY emission.Code
                        ORDER BY Capita DESC`, [])
}

// Get cumulative emissions of specified country
async function getCumulativeCountry(id) {
    return query(`SELECT emission.Country Country, emission.Code Code, SUM(emission.Value)/1000000 Emission, 1000*SUM(emission.Value)/AVG(population.Value) Capita, MAX(emission.Year) Max, MIN(emission.Year) Min
                        FROM emission
                        INNER JOIN population
                        WHERE emission.Value IS NOT NULL
                        AND emission.Code = ?
                        AND emission.Year > 1991
                        AND emission.Code = population.Code
                        AND emission.Year = population.Year
                        GROUP BY emission.Code`, [id])
}

module.exports = {  connectDatabase,
                    closeDatabase,
                    getPopulations,
                    getEmissions,
                    getPopulationByCountry,
                    getCountries,
                    getEmissionsByCountry,
                    getDataByCountry,
                    getYearRange,
                    getHighestEmitters,
                    getCumulativeEmissions,
                    getMaxYear,
                    getMinYear,
                    getCumulativeCountry,
                    getCumulativePerCapita }