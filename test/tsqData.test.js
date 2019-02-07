process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const TSQData = require('../models/TSQData')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('TSQ Data', () => {

	// beforeEach(done => {
  //    TSQData.remove( {}, err => {
  //        done();
  //    })
  //  })

	describe('/GET /', () => {
		it('should show return the documentation for the TSQData endpoint', done => {
			console.log('this test needs to be built')
			done()
		})
	})

	describe('/GET TSQData', () => {
		it('should retrieve a technical skills questionaire entry by _id field', done => {
			console.log('this test needs to be built')
			done()
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
