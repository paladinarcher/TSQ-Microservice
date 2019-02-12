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
const programmingLanguages = require('./routes/tsq/programmingLanguages')
const markupLanguages = require('./routes/tsq/markupLanguages')
const queryLanguages = require('./routes/tsq/queryLanguages')
const stylesheetLanguages = require('./routes/tsq/stylesheetLanguages')
const libraries = require('./routes/tsq/libraries')
const frameworks = require('./routes/tsq/frameworks')
const concepts = require('./routes/tsq/concepts')

// port variable
const port = 4000

// middleware
app.use(cors())
// app.use(express.static(path.join(__dirname, 'client')))
app.use(bodyParser.json())
// app.use(passport.initialize())
// app.use(passport.session())
// require('./config/passport')(passport)

app.use('/tsq/tsqData', tsqData)
app.use('/tsq/skillSearch', skillSearch)
app.use('/tsq/markupLanguages', markupLanguages)
app.use('/tsq/programmingLanguages', programmingLanguages)
app.use('/tsq/stylesheetLanguages', stylesheetLanguages)
app.use('/tsq/queryLanguages', queryLanguages)
app.use('/tsq/libraries', libraries)
app.use('/tsq/frameworks', frameworks)
app.use('/tsq/concepts', concepts)

// route settings
app.get('/', (req, res) => res.send('Hello from TSQ!'))


// tell app to listen on the port
app.listen(port, () => console.log('Server started on port ' + port))

module.exports = app

