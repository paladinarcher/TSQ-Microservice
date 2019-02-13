const mongoose = require('mongoose')
const config = require('../config/database')
const rand = require('random-key')

const SkillSchema = mongoose.Schema({
	name: {
		type: String,
	}
	tags: {
		type: []
	}
	userKey: {

	}
})

const SkillData = module.exports = mongoose.model('Skills', SkillSchema)
