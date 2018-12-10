const sqlite = require('sqlite3')
const fs = require('fs')
const xml = require('xml2js')

let db = new sqlite.Database('./emissions.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log('Connected to the database')
})

let sql = `INSERT INTO emission
            VALUES (?, ?, ?, ?)`

const parse = (blob) => {
    let ret = []
    /*
    ret.code = blob[0]['$'].key
    ret.country = blob[0]._
    ret.year = blob[2]._
    ret.value = blob[3]._
    */
    ret.push(blob[0]._)
    ret.push(blob[2]._)
    ret.push(blob[3]._)
    ret.push(blob[0]['$'].key)
    return ret
}

var parser = new xml.Parser()
fs.readFile(__dirname + '/API_EN.ATM.CO2E.KT_DS2_en_xml_v2_10227343.xml', (err, data) => {
//fs.readFile(__dirname + '/API_SP.POP.TOTL_DS2_en_xml_v2_10224853.xml', (err, data) => {
//fs.readFile('http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=xml', (err, data) => {
    parser.parseString(data, (err, res) => {
        const results = res.Root.data[0].record
        const toDB = results.map(r => db.run(sql, parse(r.field)))
        console.log(toDB)
        //console.dir(parse(res.Root.data[0].record[0].field))
        db.close()
    })
})

/*

db.run(sql, data)

db.all('SELECT * FROM population', [], (err , rows) => {
    if (err) {
        throw err
    }
    rows.forEach((row) => {
        console.log(row.Country, row.Year)
    })
})


db.close()
*/