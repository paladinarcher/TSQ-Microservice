process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const SkillUserData = require('../models/SkillsUser')
const server = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const skillUserURL = '/tsq/skills/users'


const testData = {
  userEntry: {
    skills: []
  },
  userEntryWithSkills: {
    skills: [
      {name: 'python', familiarityScore: 3},
      {name: 'java', familiarityScore: 5},
      {name: 'gardening', familiarityScore: 5},
    ]
  }
}

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
    SkillUserData.deleteMany( {}, err => {
        done();
    })
  })

  describe('/POST /skills/users/register', () => {
  	it('it creates a user skills entry', done => {
      chai.request(server)
        .post(skillUserURL + '/register/')
        .send(testData.userEntry)
        .end((error, response) => {
          if (error) {
            console.log(error)
          }
            should.exist(response.body)
            response.should.have.status(200)
            response.body.should.be.a('object')
            response.body.should.have.property('success').eql(true)
          done()
        })
    })

  })

  describe('/GET /skills/users/findAll', () => {
  	it('it queries all the user skills entries', done => {
      chai.request(server)
          .get(skillUserURL + '/findall')
          .end((error, response) => {
            if (error) {
              console.log(error)
            }
              should.exist(response.body)
              response.should.have.status(200)
              response.body.should.be.a('object')
              response.body.should.have.property('success').eql(true)
              response.body.data.should.have.property('entries').eql(0)
            done()
          })
    })
  })

  describe('/GET /skills/users/findOne', () => {
    it('it queries the user skills entries by key', done => {
      let userData = new SkillUserData(testData.userEntry)
      userData.save((error, data) => console.log(data))
      let entryToCheckAgainst = SkillUserData.findOne({ skills: [] })
      console.log(entryToCheckAgainst.key)

      chai.request(server)
        .get(skillUserURL + '/findOne/key/' + entryToCheckAgainst.key)
        .end((error, response) => {
          if (error) {
            console.log(error)
          }
            should.exist(response.body)
            response.should.have.status(200)
            response.body.should.be.a('object')
            console.log(response.body)
            done()
        })
    })
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
