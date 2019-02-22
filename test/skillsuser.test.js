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
    _id: '5c70404993c5e936388577dd',
    key: 'thisIsth3K3y',
    skills: []
  },
  userEntryWithSkills: {
    _id: '5c70404993c5e936388577dd',
    key: 'thisIsth3K3y',
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
    userData.save()
      chai.request(server)
        .get(skillUserURL + '/findOne/key/' + testData.userEntry.key)
        .end((error, response) => {
          if (error) {
            console.log(error)
          }
            should.exist(response.body)
            response.should.have.status(200)
            response.body.should.be.a('object')
            response.body.data.payload.should.be.a('object')
            chai.assert(response.body.data.payload.key == testData.userEntry.key,
              'the key from the payload does not match the entry created')
            done()
        })
    })
    it('it queries the user skills entries by id', done => {
      let userData = new SkillUserData(testData.userEntry)
      userData.save((error, data) => console.log(data._id))
        chai.request(server)
          .get(skillUserURL + '/findOne/id/' + testData.userEntry._id)
          .end((error, response) => {
            should.exist(response.body)
            response.should.have.status(200)
            response.body.should.be.a('object')
            response.body.data.payload.should.be.a('object')
            chai.assert(response.body.data.payload._id == testData.userEntry._id,
              'the id from the payload does not match the entry created')
            done()
          })
    })
  })

  describe('/UPDATE /skills/users/addSkills/', () => {
  	it('it adds skills by name to a userskills entry', done => {
      let userData = new SkillUserData(testData.userEntry)
      let newSkillsData = {
        skills: [
          {name: 'test-skill-1', familiarityScore: 3},
          {name: 'test-skill-2'}
        ]
      }
      userData.save((error, data) => console.log(data._id))

        chai.request(server)
          .put(skillUserURL + '/addSkills/key/' + testData.userEntry.key)
          .send(newSkillsData)
          .end((error, response) => {
            should.exist(response.body)
            response.should.have.status(200)
            response.body.should.be.a('object')
            response.body.should.have.property('success').eql(true)
            response.body.should.have.property('message').eql('Update Complete')
            chai.assert(response.body.data.payload.nModified == 1,
              'The entry did not update')
            done()
          })
    })
  })

  describe('/UPDATE /skills/users/removeSkills/', () => {
    it('it removes skills by skillname to a userskills entry', done => {
      let newUserSkillEntry = new SkillUserData(testData.userEntryWithSkills)
      let skillsToRemove = {
        skills: [
          {name: 'gardening'}
        ]
      }

      chai.request(server)
        .put(skillUserURL + '/removeSkills/key/' + testData.userEntryWithSkills.key)
        .send(skillsToRemove)
        .end((error, response) => {
          should.exist(response.body)
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('success').eql(true)
          console.log(response.body.data)
          done()
        })
    })
  })

  describe('/DELETE /skills/users/remove', () => {
    it('it removes user skill entries by id')
  	it('it removes user skill entries by key')
  })
})
