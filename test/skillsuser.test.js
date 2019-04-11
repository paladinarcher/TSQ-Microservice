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
    _id: '5c70404993c5e936388577dd',
    key: 'thisIsth3K3y',
    skills: []
  },
  userEntryWithSkills: {
    _id: '5c70404993c5e936388577dd',
    key: 'thisIsth3K3y',
    skills: [
      {
        familiar: true,
        confidenceLevel: 0,
        _id: '5ca3918cb85bad4f0f999aae',
        name: '5c70404993c5e936388577dd'
      },
      {
        familiar: true,
        confidenceLevel: 0,
        _id: '5ca3918db85bad4f0f999ab1',
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
      { id: '5c70404993c5e936388577d1', name: 'test-skill-with-tags' }
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
  before(function(done) {
    mongoose.connect(config.database);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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

  describe('/UPDATE /skills/users/addSkills/', () => {
    it('it adds skills by name to a userskills entry', done => {
      const { skillsToAdd, userEntry } = testData;
      const { testSkill1, testSkill2 } = testData.skillData;
      const { key } = testData.userEntry;

      addAUserSkillEntry(userEntry);
      addSkillData(testSkill1);
      addSkillData(testSkill2);

      chai
        .request(server)
        .put(skillUserURL + '/addSkills/key/' + key)
        .send(skillsToAdd)
        .end((error, response) => {
          should.exist(response.body);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eql(true);
          chai.assert(
            response.body.data.payload.nModified == 1,
            'The entry did not update'
          );
          done();
        });
    });
  });

  describe('/UPDATE /skills/users/removeSkills/', () => {
    it('it removes skills by skillname to a userskills entry', done => {
      const { skillsToRemove, userEntryWithSkills } = testData;
      const { testSkill1, testSkill2 } = testData.skillData;
      const { key } = testData.userEntry;

      addAUserSkillEntry(userEntryWithSkills);
      addSkillData(testSkill1);
      addSkillData(testSkill2);

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

  describe('/DELETE /skills/users/remove', () => {
    it('it removes user skill entries by id', done => {
      addAUserSkillEntry(testData.userEntry);
      chai
        .request(server)
        .delete(skillUserURL + '/remove/id/' + testData.userEntry._id)
        .end((error, response) => {
          if (error) console.log(error);
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
          if (error) console.log(error);
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
