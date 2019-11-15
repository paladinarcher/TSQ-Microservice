const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

let config;

if (process.env.NODE_ENV == 'test') {
  config = require('./config/testing');
} else {
  config = require('./config/database');
}

mongoose.connect(config.database);

mongoose.connection.on('connected', () =>
  console.log('DATABASE CONNECTED: ' + config.database)
);

mongoose.connection.on('error', err => console.log('DATABASE ERROR: ' + err));

// init express
const app = express();

// routes
const skillSearch = require('./routes/tsq/skillSearch');
const userSkillData = require('./routes/tsq/skillsUser');
const healthCheck = require('./routes/tsq/healthCheck');

// port variable
const port = 4000;

// middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/tsq/skills', skillSearch);
app.use('/tsq/skills/users', userSkillData);
// console.log('healthCheck: ', healthCheck);
app.use('/tsq/healthCheck', healthCheck);
// app.get('/healthCheck', (req, res) => res.send('por que no tengo comida'));
// app.use('/healthCheck', (req, res) => {
//   console.log('tsq health check');
//   res.writeHead(201);
//   res.write('200 found');
//   res.end();
//   // res.send('woo hoo');
// });

// route settings
app.get('/', (req, res) => res.send('Hello from TSQ!'));

// tell app to listen on the port
app.listen(port, () => console.log('Server started on port ' + port));

module.exports = app;
