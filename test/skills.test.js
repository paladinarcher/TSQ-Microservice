process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const SkillData = require('../models/Skills')
const server = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('Skills API Tests', () => {
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
    SkillData.deleteMany( {}, err => {
        done();
    })
  })

  describe('/POST /skills/', () => {
  	it('it creates a skill entry')
  })

  describe('/GET /skills/', () => {
  	it('it queries all the skills entries')
  	it('it queries all the skills entries by key')
  	it('it queries all the skills entries by id')
  	it('it queries all the skills entries by tags')
  })

  describe('/UPDATE /skills/', () => {
  	it('it updates skill name')
  	it('it updates skill tags')
  })


  describe('/DELETE /skills/', () => {
  	it('it removes skill entries by id')
  })
})
