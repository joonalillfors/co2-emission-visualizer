const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyparser = require('body-parser')
const cors = require('cors')
const schedule = require('node-schedule')
const { connectDatabase, closeDatabase, updateDatabase } = require('./database/database')
require('dotenv').config()

connectDatabase()

// Update database 15th day of each month at 3:00 AM
const updater = schedule.scheduleJob('0 3 15 * *', () => {
    console.log('UPDATING DB')
    updateDatabase()
})

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.use(express.static('./client/build'))
app.use('/api/v1', require('./routes/routes'))

http.on('close', () => {
    console.log('Disconnecting from the database')
    closeDatabase()
})

const PORT = process.env.PORT || 8080

http.listen(PORT, () => {
        console.log(`Running on port: ${PORT}`)
})