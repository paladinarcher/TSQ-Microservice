const mongoose = require('mongoose')
const config = require('../config/database')
const rand = require('random-key')


const skillsData = {
	name: {
		type: String,
		required: true,
	},
	familiarityScore: {
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

// TODO: fix this query.  All Skills are being removed instead of
// just those sent in the request
module.exports.removeSkillsByKey = function (key, data, callback) {
	let query = {key: key}
	let updateQuery = { $pull: { skills: { $in: {  }} }}
	console.log(key)
	console.log(data)
	SkillUserData.update(query, updateQuery, callback)
}
