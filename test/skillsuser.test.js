process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const SkillUserData = require('../models/SkillsUser');
const SkillData = require('../models/Skills');
const server = require('../app');
const config = require('../config/testing');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const skillUserURL = '/tsq/skills/users';

const testData = {
  userEntry: {
    _id: '5c70404993c5e936388579dd',
    key: 'thisIsth3K3y',
    skills: []
  },
  userEntryWithSkills: {
    _id: '5c70404993c5e936388578dd',
    key: 'thisIsth3K3y',
    skills: [
      {
        familiar: true,
        confidenceLevel: 0,
        _id: '5c70404993c5e936388577dd',
        name: '5c70404993c5e936388577dd'
      },
      {
        familiar: true,
        confidenceLevel: 0,
        _id: '5c70404993c5e936388577d1',
        name: '5c70404993c5e936388577d1'
      }
    ]
  },
  userEntryWithDuplicateSkills: {
    _id: '5c70404993c5e936388578dd',
    key: 'thisIsth3K3y',
    skills: [
      {
        familiar: true,
        confidenceLevel: 0,
        _id: '5c70404993c5e936388577dd',
        name: '5c70404993c5e936388577dd'
      },
      {
        familiar: true,
        confidenceLevel: 0,
        _id: '5c70404993c5e936388577dd',
        name: '5c70404993c5e936388577dd'
      },
      {
        familiar: false,
        confidenceLevel: 3,
        _id: '5c70404993c5e936388577d1',
        name: '5c70404993c5e936388577d1'
      },
      {
        familiar: true,
        confidenceLevel: 0,
        _id: '5c70404993c5e936388577d1',
        name: '5c70404993c5e936388577d1'
      }
    ]
  },
  skillsToRemove: {
    skills: [{ name: '5c70404993c5e936388577d1' }]
  },
  skillsToAdd: {
    skills: [
      {
        id: '5c70404993c5e936388577dd',
        name: 'basic-test-skill',
        familiar: true
      },
      { 
        id: '5c70404993c5e936388577d1', 
        name: 'test-skill-with-tags' 
      }
    ]
  },
  duplicateSkillsToAdd: {
    skills: [
      {
        id: '5c70404993c5e936388577dd',
        name: 'basic-test-skill',
        familiar: true,
        confidenceLevel: 0
      },
      {
        id: '5c70404993c5e936388577dd',
        name: 'basic-test-skill',
        familiar: false,
        confidenceLevel: 2
      },
      { 
        id: '5c70404993c5e936388577d1', 
        name: 'test-skill-with-tags',
        familiar: false,
        confidenceLevel: 3
      },
      { 
        id: '5c70404993c5e936388577d1', 
        name: 'test-skill-with-tags',
        confidenceLevel: 3
      }
    ]
  },
  skillData: {
    testSkill1: {
      _id: '5c70404993c5e936388577dd',
      name: 'basic-test-skill'
    },
    testSkill2: {
      _id: '5c70404993c5e936388577d1',
      name: 'test-skill-with-tags',
      tags: []
    }
  }
};

async function addAUserSkillEntry(userSkillEntryObject) {
  userSkillEntryObject = new SkillUserData(userSkillEntryObject);
  await userSkillEntryObject.save();
  return;
}

async function addSkillData(skill) {
  skill = new SkillData(skill);
  await skill.save();
  return;
}

chai.use(chaiHttp);

describe('SkillsUser API Tests', () => {
  before(function (done) {
    mongoose.connect(config.database);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      console.log('We are connected to test database!');
      done();
    });

    addSkillData(testData.skillData.testSkill1);
    addSkillData(testData.skillData.testSkill2);

  });

  beforeEach(done => {
    SkillUserData.deleteMany({}, err => {
      done();
    });
  });


  describe('/POST /skills/users/register', () => {
    it('it creates a user skills entry', done => {
      chai
        .request(server)
        .post(skillUserURL + '/register/')
        .send(testData.userEntry)
        .end((error, response) => {
          if (error) {
            throw new Error(error);
          }
          should.exist(response.body);
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eql(true);
          done();
        });
    });
  });

  describe('/GET /skills/users/findAll', () => {
    it('it queries all the user skills entries', done => {
      chai
        .request(server)
        .get(skillUserURL + '/findall')
        .end((error, response) => {
          if (error) {
            throw new Error(error)
          }
          should.exist(response.body);
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eql(true);
          response.body.data.should.have.property('entries').eql(0);
          done();
        });
    });
  });

  describe('/GET /skills/users/findOne', () => {
    it('it queries the user skills entries by key', done => {
      addAUserSkillEntry(testData.userEntry);
      chai
        .request(server)
        .get(skillUserURL + '/findOne/key/' + testData.userEntry.key)
        .end((error, response) => {
          if (error) {
            throw new Error(error);
          }
          should.exist(response.body);
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.data.payload.should.be.a('object');
          chai.assert(
            response.body.data.payload.key == testData.userEntry.key,
            'the key from the payload does not match the entry created'
          );
          done();
        });
    });
    it('it queries the user skills entries by id', done => {
      addAUserSkillEntry(testData.userEntry);
      chai
        .request(server)
        .get(skillUserURL + '/findOne/id/' + testData.userEntry._id)
        .end((error, response) => {
          should.exist(response.body);
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.data.payload.should.be.a('object');
          chai.assert(
            response.body.data.payload._id == testData.userEntry._id,
            'the id from the payload does not match the entry created'
          );
          done();
        });
    });
  });

  describe('/GET /skills/users/getDuplicateSkills/key/', () => {
    it('it queries a userkey for duplicate skill entries', done => {
      const { userEntryWithDuplicateSkills } = testData;
      const { testSkill1, testSkill2 } = testData.skillData;
      const { key } = testData.userEntryWithDuplicateSkills;

      addAUserSkillEntry(userEntryWithDuplicateSkills);

      chai
        .request(server)
        .get(skillUserURL + '/getDuplicateSkills/key/' + key)
        .end((error, response) => {
          should.exist(response.body);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eql(true);
          chai.assert(response.body.data.payload.entries === 2, 'it did not find all duplicates for this user')
          done();
        })
    })
  })


  describe('/UPDATE /skills/users/addSkills/', () => {
    beforeEach(done => {
      SkillUserData.deleteMany({}, err => {
        done();
      });
    });

    const { userEntry, userEntryWithSkills, skillsToAdd } = testData;
    const singleSkill = { skills: [ skillsToAdd.skills[0] ]}
    
    it('should add a skill to the user key', done => {
      addAUserSkillEntry(userEntry);
      const { key } = userEntry
      
      chai
        .request(server)
        .put(`${skillUserURL}/addSkills/key/${key}`)
        .send(singleSkill)
        .end((error, response) => {
          chai.assert(response, 'response does not exist')

          const { body, status } = response; 
          const { success, message, data } = response.body;
          const { payload } = response.body.data;
          const { doc } = payload

          chai.assert(status === 200, 'status does not eql 200')
          chai.assert(typeof(body) === 'object', 'response type is not an object')
          chai.assert(success === true, 'success does not eql true')
          chai.assert(message === 'Update Successful', 'update msg does not match')
          chai.assert(typeof(data) === 'object', 'data is not an object')
          chai.assert(typeof(payload) === 'object', 'payload type incorrect')
          chai.assert(typeof(doc) === 'object', 'doc type incorrect')
          chai.assert(doc.key === key, 'key is not matching')
          chai.assert(doc.skills.length === 1, 'skill len is not correct')
          chai.assert(doc.skills[0]._id === '5c70404993c5e936388577dd', 'skill at index 0 incorrect')
          done();
        })
    })

    it('should add multiple skills at once to a user key', done => {
      addAUserSkillEntry(userEntry);
      const { key } = userEntry

      chai
        .request(server)
        .put(`${skillUserURL}/addSkills/key/${key}`)
        .send(skillsToAdd)
        .end((error, response) => {
          chai.assert(response, 'response does not exist')

          const { body, status } = response; 
          const { success, message, data } = response.body;
          const { payload } = response.body.data;
          const { doc } = payload

          chai.assert(status === 200, 'status does not eql 200')
          chai.assert(typeof(body) === 'object', 'response type is not an object')
          chai.assert(success === true, 'success does not eql true')
          chai.assert(message === 'Update Successful', 'update msg does not match')
          chai.assert(typeof(data) === 'object', 'data is not an object')
          chai.assert(typeof(payload) === 'object', 'payload type incorrect')
          chai.assert(typeof(doc) === 'object', 'doc type incorrect')
          chai.assert(doc.key === key, 'key is not matching')
          chai.assert(doc.skills.length === 2, 'skill len is not correct')
          chai.assert(doc.skills[0]._id === '5c70404993c5e936388577dd', 'skill at index 0 incorrect')
          chai.assert(doc.skills[1]._id === '5c70404993c5e936388577d1', 'skill at index 1 incorrect')
          done();  
        })
    })

    it('should not add a duplicate of a skill that has already been added', done => {
      addAUserSkillEntry(userEntryWithSkills);
      const { key } = userEntryWithSkills;

      chai
        .request(server)
        .put(`${skillUserURL}/addSkills/key/${key}`)
        .send(skillsToAdd)
        .end((error, response) => {
          chai.assert(response, 'response does not exist')

          const { body, status } = response; 
          const { success, message, data } = response.body;
          const { payload } = response.body.data;
          const { doc } = payload

          chai.assert(status === 200, 'status does not eql 200')
          chai.assert(typeof(body) === 'object', 'response type is not an object')
          chai.assert(success === true, 'success does not eql true')
          chai.assert(message === 'Update Successful', 'update msg does not match')
          chai.assert(typeof(data) === 'object', 'data is not an object')
          chai.assert(typeof(payload) === 'object', 'payload type incorrect')
          chai.assert(typeof(doc) === 'object', 'doc type incorrect')
          chai.assert(doc.key === key, 'key is not matching')
          chai.assert(doc.skills.length === 2, 'skill len is not correct')
          chai.assert(doc.skills[0]._id === '5c70404993c5e936388577dd', 'skill at index 0 incorrect')
          chai.assert(doc.skills[1]._id === '5c70404993c5e936388577d1', 'skill at index 1 incorrect')
          done();  
        })
    })
  });

  describe('/UPDATE /skills/users/removeSkills/', () => {
    it('it removes skills by skillname to a userskills entry', done => {
      const { skillsToRemove, userEntryWithSkills } = testData;
      const { testSkill1, testSkill2 } = testData.skillData;
      const { key } = testData.userEntry;

      addAUserSkillEntry(userEntryWithSkills);

      chai
        .request(server)
        .put(skillUserURL + '/removeSkills/key/' + key)
        .send(skillsToRemove)
        .end((error, response) => {
          should.exist(response.body);
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eql(true);
          chai.assert(
            response.body.data.payload.nModified == 1,
            'The entry did not update'
          );
          // TODO: fix this test to work better.
          done();
        });
    });
  });

  describe('/UPDATE /skills/users/removeDuplicateSkills', () => {
    it('it removes skill entries from a user that are duplicated', done => {
      const { userEntryWithDuplicateSkills } = testData;
      const { testSkill1, testSkill2 } = testData.skillData;
      const { key } = testData.userEntryWithDuplicateSkills;

      addAUserSkillEntry(userEntryWithDuplicateSkills);

      chai
        .request(server)
        .put(skillUserURL + '/removeDuplicateSkills/key/' + key)
        .end((error, response) => {
          if (error) throw new Error(error)
          should.exist(response.body)
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('success').eql(true)
          SkillUserData.getDuplicateSkills(key, (error, result) => {
            if (error) throw new Error(error)
            chai.assert(result.length === 0, 'there are still duplicates')
          })
          done();
        })

    })
  })

  describe('/DELETE /skills/users/remove', () => {
    it('it removes user skill entries by id', done => {
      addAUserSkillEntry(testData.userEntry);
      chai
        .request(server)
        .delete(skillUserURL + '/remove/id/' + testData.userEntry._id)
        .end((error, response) => {
          if (error) throw new Error(error);
          should.exist(response.body);
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eql(true);
          SkillUserData.findOne(
            { _id: testData.userEntry._id },
            (error, data) => {
              chai.assert(data == null, 'the entry still exists in the db');
            }
          );
          done();
        });
    });
    it('it removes user skill entries by key', done => {
      addAUserSkillEntry(testData.userEntry);
      chai
        .request(server)
        .delete(skillUserURL + '/remove/key/' + testData.userEntry.key)
        .end((error, response) => {
          if (error) throw new Error(error);
          should.exist(response.body);
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eql(true);
          SkillUserData.findOne(
            { key: testData.userEntry.key },
            (error, data) => {
              chai.assert(data == null, 'the entry still exists in the db');
            }
          );
          done();
        });
    });
  });
});
