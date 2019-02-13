process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const LanguageData = require('../models/Languages')
const server = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('LanguagesAPI', () => {
	before(function (done) {
    mongoose.connect('mongodb://localhost/testTSQData');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });


  beforeEach(done => {
    LanguageData.deleteMany( {}, err => {
        done();
    })
  })


  describe('GET /languages/languageData/', () => {
  	it('it queries all the languagedata in as an array when no query params are specified')
  	it('it queries the languageData entries by id')
  	it('it queries the languageData entries by languageType')
  	it('it queries the languageData entries by shortName')
  	it('it queries the languageData entries by familiarityScore')
  })


  describe('POST /languages/addLanguageData/', () => {
  	it('it creates a new languageData entry')
  })


  describe('POST /languages/addNewLanguageType/', () => {
  	it('it adds a new language type to the languageType.js array and edit the file')
  	it('it only succeeds when the data posted is a string')
  })


  describe('PUT /updateLanguageData/:id', () => {
  	it('it updates the languageData entry selected by id')
  })


  describe('DELETE /removeLanguageData/:id', () => {})

})
