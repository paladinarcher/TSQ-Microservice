const mongoose = require('mongoose')
const config = require('../config/database')
const rand = require('random-key')


const skillsData = {
	name: {
		type: String,
		required: true,
	},
	familiar: {
		type: Boolean,
		default: false,
		required: true
	},
	confidenceLevel: {
		type: Number,
		default: 0,
		required: true,
	}
}

const SkillsUserSchema = mongoose.Schema({
	key: {
		type: String,
		default: () => rand.generate(),
		required: true,
	},
	skills: {
		type: [ skillsData ],
		default: [],
		required: true,
	},
})


const SkillUserData = module.exports = mongoose.model('Keys', SkillsUserSchema)
module.exports.registerUserData = function (userData, callback) {
	userData.save(callback)
}

module.exports.getAllUserData = function (callback) {
	SkillUserData.find({}, callback)
}

module.exports.getUserDataById = function (id, callback) {
	let query = {_id:id}
	SkillUserData.findOne(query, callback)
}

module.exports.getUserDataByKey = function (key, callback) {
	let query = {key: key}
	SkillUserData.findOne(query, callback)
}

module.exports.addSkillsByKey = function (key, data, callback) {
	let query = { key: key }
	let updateQuery = { $addToSet: { skills: data }}
	SkillUserData.update(query, updateQuery, callback)
}

module.exports.removeSkillsByKey = function (key, data, callback) {
	let query = {key: key}
	let skillNames = data.map((item) => { return item.name })
	let updateQuery = { $pull: { skills: { name: { $in: skillNames }}}}
	SkillUserData.update(query, updateQuery, { multi: true }, callback)
}

module.exports.removeSkillDataByKey = function (key, callback) {
	const query = { key: key }
	SkillUserData.deleteOne(query, callback)
}

module.exports.removeSkillDataById = function (id, callback) {
	const query = { _id: id }
	SkillUserData.deleteOne(query, callback)
}

module.exports.updateFamiliarityByKey = function (key, skill, familiar, callback) {
	const query = { key: key }
	SkillUserData.updateOne(query, 
		{ $set: { 'skills.$[skillObject].familiar': familiar } }, 
		{ arrayFilters: [ 
			{ 'skillObject.name': { $eq: skill } } 
		]}, 
		callback)
}