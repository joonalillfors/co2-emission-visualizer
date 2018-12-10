const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyparser = require('body-parser')
const cors = require('cors')
const { connectDatabase, closeDatabase } = require('./database/database')
require('dotenv').config()

connectDatabase()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.use(express.static('./client/build'))
app.use('/api', require('./routes/routes'))

http.on('close', () => {
    console.log('Disconnecting from the database')
    closeDatabase()
})

const PORT = process.env.PORT || 8080

http.listen(PORT, () => {
        console.log(`Running on port: ${PORT}`)
})