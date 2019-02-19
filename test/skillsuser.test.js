process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const SkillData = require('../models/Skills')
const server = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('SkillsUser API Tests', () => {
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

  describe('/POST /skills/users/register', () => {
  	it('it creates a user skills entry')
  })

  describe('/GET /skills/findAll', () => {
  	it('it queries all the user skills entries')
  })

  describe('/GET /skills/findOne', () => {
    it('it queries the user skills entries by key')
    it('it queries the user skills entries by id')
  })

  describe('/UPDATE /skills/users/addSkills/', () => {
  	it('it adds skills by name to a userskills entry')
  })

  describe('/UPDATE /skills/users/removeSkills/', () => {
    it('it adds skills by skillname to a userskills entry')
  })

  describe('/DELETE /skills/users/remove', () => {
    it('it removes user skill entries by id')
  	it('it removes user skill entries by key')
  })
})
