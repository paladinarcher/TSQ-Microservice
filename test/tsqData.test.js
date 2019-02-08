process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const TSQData = require('../models/TSQData')
const server = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

const testData = {
	testTSQ: new TSQData({
		_id: "5c5cc794972c11080ce18224",
		skillList: [ "test1", "test2", "test3" ],
		uKey: 'sldk3lk344l3kj45l'
	})
}

describe('TSQ Data', () => {

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
    TSQData.remove( {}, err => {
        done();
    })
  })

	describe('/GET /', () => {
		it('should show return a status of 200', done => {
			chai.request(server)
				.get('/tsq/tsqData/')
				.end( (err, res) => {
					res.should.have.status(200);
					done()
			})
		})
	})

	describe('/GET TSQData', () => {
		it('should retrieve a technical skills questionaire entry by _id field', done => {
			const theData = testData.testTSQ
			const id = testData.testTSQ._id
			theData.save(theData)
			chai.request(server)
				.get('/tsq/tsqData/?id=' + id)
				.end( (err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					chai.assert(res.body.TSQData.id == id, 'endpoint not finding test data by id')
					done()
				})
		})

		it('should retrieve a technical skills questionaire entry by uKey field', done => {
			console.log('this test needs to be built')
			done()
		})
	})

	describe('/POST createTSQ', () => {
		it('should create a Technical Skills Questionaire Data Entry', done => {
			console.log('this test needs to be built')
			done()
		})
	})


	describe('/PUT updateTSQ', () => {
		it('should update an already existing Technical Skills Questionaire Data Entry', done => {
			console.log('this test needs to be built')
			done()
		})
	})


	describe('/DELETE removeTSQ', () => {
		it('should delete a Technical Skills Questionaire Data Entry', done => {
			console.log('this test needs to be built')
			done()
		})
	})
})
