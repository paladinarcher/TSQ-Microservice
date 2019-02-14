const mongoose = require('mongoose')
const config = require('../config/database')


const schema = mongoose.Schema({
	name: {
		type: String,
		default: '',
		required: true,
	},
	tags: {
		type: [ String ],
		default: [],
		required: true,
	},
	uKeys: {
		type: [ String ],
		default: [],
		required: true,
	}
})

const SkillData = module.exports = mongoose.model('SkillData', schema)

module.exports.addNewSkill = function (newSkill, callback) {
	newSkill.save(callback)
}


module.exports.getSkillById = function (id, callback) {
	let query = { _id: id }
	SkillData.findOne(query, callback)
}

module.exports.getAllSkills = function (callback) {
	SkillData.find(callback)
}

module.exports.getAllSkillsByTags = function (tags, callback) {
	let query = {tags: { $all: tags }}
	SkillData.find(query, callback)
}

// TODO: fix the db is not updating issue
module.exports.updateSkillName = function (id, skillNameUpdate, callback) {
SkillData.update({ _id: id }, {$set: {name: skillNameUpdate.toString().toLowerCase().trim()}}, callback)
}
