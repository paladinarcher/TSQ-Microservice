const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')


// init express
const app = express()

// routes
const tsq = require('./routes/tsq')

// port variable
const port = 4000

// middleware
app.use(cors())
// app.use(express.static(path.join(__dirname, 'client')))
app.use(bodyParser.json())
// app.use(passport.initialize())
// app.use(passport.session())
// require('./config/passport')(passport)

app.use('/tsq', tsq)

// route settings
app.get('/', (req, res) => res.send('Hello from TSQ!'))


// tell app to listen on the port
app.listen(port, () => console.log('Server started on port ' + port))
