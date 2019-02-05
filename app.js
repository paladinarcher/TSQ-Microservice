const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')


// init express
const app = express()


// port variable
const port = 4000


// route settings
app.get('/', (req, res) => res.send('Hello from TSQ!'))


// tell app to listen on the port
app.listen(port, () => console.log('Server started on port ' + port) )
