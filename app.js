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
const skillSearch = require('./routes/tsq/skillSearch')
const userSkillData = require('./routes/tsq/skillsUser')

// port variable
const port = 4000

// middleware
app.use(cors())
app.use(bodyParser.json())

app.use('/tsq/skills', skillSearch)
app.use('/tsq/skills/users', userSkillData)

// route settings
app.get('/', (req, res) => res.send('Hello from TSQ!'))


// tell app to listen on the port
app.listen(port, () => console.log('Server started on port ' + port))

module.exports = app

