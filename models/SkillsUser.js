const mongoose = require('mongoose')
const config = require('../config/database')
const rand = require('random-key')




class FamiliarityScore = {
	constructor(skill, score=0) {
		this.skill = skill;
		this.score = score;
	}
}


const SkillsUserSchema = mongoose.Schema({
	userSkills: {
		type: [ Skills ]
	}
	userKey: {

	}
	familiarityScore: {
		type: [ FamiliarityScore ],
		default: [],
		required: true,
	}
})

const SkillUserData = module.exports = mongoose.model('Skills', SkillsUserSchema)
