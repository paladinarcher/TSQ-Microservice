const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')

const config = require('./config/database')

mongoose.connect(config.database)

mongoose.connection.on('connected', () => console.log('DATABASE CONNECTED: ' + config.database))

mongoose.connection.on('error', (err) => console.log('DATABASE ERROR: ' + err))

// init express
const app = express()

// routes
const tsqData = require('./routes/tsq/tsqData')
const skillSearch = require('./routes/tsq/skillSearch')
const languages = require('./routes/tsq/languages')

// port variable
const port = 4000

// middleware
app.use(cors())
app.use(bodyParser.json())

app.use('/tsq/tsqData', tsqData)
app.use('/tsq/skillSearch', skillSearch)
app.use('/tsq/languages', languages)

// route settings
app.get('/', (req, res) => res.send('Hello from TSQ!'))


// tell app to listen on the port
app.listen(port, () => console.log('Server started on port ' + port))

module.exports = app

