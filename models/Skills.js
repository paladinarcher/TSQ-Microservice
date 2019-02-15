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

module.exports.updateSkillName = function (id, updatedName, callback) {
	let query = { _id: id }
	SkillData.update(query, {$set: updatedName}, callback)
}

module.exports.updateSkillTags = function (id, queryParams, reqData, callback) {
	let query = { _id: id }
	if (Object.keys(queryParams).indexOf('append') !== -1) {
		if (queryParams.append === 'true') {
			SkillData.update(query, { $addToSet: { tags: { $each: reqData.tags } } }, callback)
		}
	} else if (Object.keys(queryParams).indexOf('remove') !== -1) {
		if (queryParams.remove === 'true') {
			SkillData.update(query, { $pull: { tags: { $in: reqData.tags } } }, callback)
		}
	} else {
		// append by default
		SkillData.update(query, { $addToSet: { tags: { $each: reqData.tags } } }, callback)
	}
}

module.exports.removeSkill = function (id, callback) {
	let query = {_id:id}
	SkillData.deleteOne(query, callback)
}
