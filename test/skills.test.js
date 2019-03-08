process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const SkillData = require('../models/Skills')
const server = require('../app')
const config = require('../config/testing')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

const URL = '/tsq/skills'

const TestData = {
  testSkill1: {
    _id: '5c70404993c5e936388577dd',
    name: 'basic-test-skill'
  },
  testSkill2: {
    _id: '5c70404993c5e936388577dd',
    name: 'test-skill-with-tags',
    tags: [
      'tag-1', 'tag-2', 'tag-3'
    ]
  },
  tagsToAdd: {
    tags: ['tag-4']
  },
  tagsToRemove: {
    tags: ['tag-1']
  },
  nameToUpdate: {
    name: 'new-name'
  },
}

function addSkillEntry (skillDataObj) {
  skillDataObj = new SkillData(skillDataObj)
  skillDataObj.save()
  return
}

describe('Skills API Tests', () => {
	before(function (done) {
    mongoose.connect(config.database);
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
  	it('it creates a skill entry', done => {
      chai.request(server)
      .post(URL + '/')
      .send(TestData.testSkill1)
      .end((error, response) => {
        if (error) console.log(error)
        should.exist(response.body)
        response.should.have.status(200)
        response.body.should.have.property('success').eql(true)
        chai.assert(response.body.data.name == 'basic-test-skill',
          'skill was not created')
        done()
      })
    })
  })

  describe('/GET /skills/', () => {
  	it('it queries all the skills entries', done => {
      chai.request(server)
        .get(URL + '/')
        .end((error, response) => {
          if (error) console.log(error)
          chai.assert(response.body, 'No response body -- line 84')
          chai.assert(response.status === 200,
            'Status assertion not met -- line 86')
          chai.assert(response.body.success === true,
            'Success assert not fulfilled -- line 87')
          chai.assert(response.body.data.entries === 0,
            'Entries assert not fulfilled -- line 88')
          done()
        })
    })
  	it('it queries all the skills entries by id', done => {
      addSkillEntry(TestData.testSkill1)
      const ID = TestData.testSkill1._id

      chai.request(server)
        .get(URL + '/?' + ID)
        .end((error, response) => {
          chai.assert(response.body,
            'response body does not exist')
          chai.assert(response.status === 200,
            'response status is not 200')
          chai.assert(response.body.success === true,
            'success is not true')
          chai.assert(typeof(response.body.data) === 'object',
            '"data" is not an object')
          chai.assert(response.body.data.payload[0]._id == ID,
            'the id does not match the query result id')
          done()
        })
    })
  	it('it queries all the skills entries by tags', done => {
      addSkillEntry(TestData.testSkill2)
      const TAG = 'tag-1'

      chai.request(server)
        .get(URL + '/?tags=' + TAG)
        .end((error, response) => {
          chai.assert(response.body,
            'response body does not exist')
          chai.assert(response.status === 200,
            'response status is not 200')
          chai.assert(response.body.success === true,
            'success is not true')
          done()
        })
    })
  })

  describe('/UPDATE /skills/', () => {
  	it('it updates skill name', done => {
      addSkillEntry(TestData.testSkill1)
      const updatedName = 'updated-name'
      const dataToSend = { name: updatedName }
      chai.request(server)
        .put(URL + '/updateName/' + TestData.testSkill1._id)
        .send(dataToSend)
        .end((error, response) => {
          chai.assert(response.body,
            'response body does not exist')
          chai.assert(response.status === 200,
            'response status is not 200')
          chai.assert(response.body.success === true,
            'success is not true')
          chai.assert(response.body.data.nModified === 1,
            '1 entry was modified')
          done()
        })
    })
  	it('it updates skill tags', done => {
      addSkillEntry(TestData.testSkill1)
      const updatedTags = ['tag1', 'tag2']
      const dataToSend = { tags: updatedTags }
      chai.request(server)
        .put(URL + '/updateTags/' + TestData.testSkill1._id + '?append=true')
        .send(dataToSend)
        .end((error, response) => {
          chai.assert(response.body,
            'response body does not exist')
          chai.assert(response.status === 200,
            'response status is not 200')
          chai.assert(response.body.success === true,
            'success is not true')
          chai.assert(response.body.data.nModified === 1,
            '1 entry was modified')
          done()
        })
    })
  })


  describe('/DELETE /skills/', () => {
  	it('it removes skill entries by id', done => {
      addSkillEntry(TestData.testSkill1)
      const ID = TestData.testSkill1._id
      chai.request(server)
        .del(URL + '/removeEntry/' + ID)
        .end((error, response) => {
          chai.assert(response.body,
            'response body does not exist')
          chai.assert(response.status === 200,
            'response status is not 200')
          chai.assert(response.body.success === true,
            'success is not true')
          done()
        })
    })
  })
})
