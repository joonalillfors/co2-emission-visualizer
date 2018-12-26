// The URLs updated data is fetched from
const emissionURL = 'http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=xml'
const populationURL = 'http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=xml'

const admZip = require('adm-zip')
var request = require('request')
const {parseString} = require('xml2js')

// Parses xml blob to array suitable for SQL query
const parse = (blob) => {
    let ret = []
    ret.push(blob[0]._)
    ret.push(blob[2]._)
    ret.push(blob[3]._)
    ret.push(blob[0]['$'].key)
    return ret
}

// Writes new rows to database 'db' with given sql query.
// Fetches the data to be written from an URL (specified above).
const writeDB = (db, url, sql) => {
    request.get({url, encoding: null}, (err, res, body) => {
        var zip = admZip(body)
        var zipEntries = zip.getEntries()
    
        zipEntries.forEach((entry) => {
            var xml = zip.readAsText(entry)
            parseString(xml, (err, res) => {
                const results = res.Root.data[0].record
                const toDB = results.map(r => db.run(sql, parse(r.field)))
            })
        })
    })
}

// Updates given database 'db' by first deleting rows from tables
// emission and population. Then writes new data on tables.
const updateDB = async (db) => {
    await db.run(`DELETE FROM emission`, async (err) => {
        if (err)
            return console.error(err.message)
        console.log(`Row(s) deleted ${this.changes}`)
        await writeDB(db, emissionURL, `INSERT INTO emission VALUES (?, ?, ?, ?)`)
    })

    await db.run(`DELETE FROM population`, async (err) => {
        if (err)
            return console.error(err.message)
        console.log(`Row(s) deleted ${this.changes}`)
        await writeDB(db, populationURL, `INSERT INTO population VALUES (?, ?, ?, ?)`)
    })
}

module.exports = updateDB