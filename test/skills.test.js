process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const SkillData = require('../models/Skills')
const server = require('../app')

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
    mongoose.connect('mongodb://localhost:27017/testTSQData');
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
        console.log(response.body)
        done()
      })
    })
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
