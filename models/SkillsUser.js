const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const config = require('../config/database')
const rand = require('random-key')
const SkillData = require('./Skills')


const skillsData = {
	name: {
		type: Schema.Types.ObjectId,
		ref: 'Skills'
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
	SkillUserData.findOne(query).populate('skills.name').exec(callback);
}

module.exports.getUserSkillByKey = function (key, skill, callback) {
	console.log(skill)
	// let skillFindQuery = { $elemMatch: { skills: { name: skill }}}
	// let skillFindQuery = { $elemMatch: { name: { $eq: skill } }}
	let query = {
		key: key,
		"skills.name" : mongoose.Types.ObjectId(skill)
	}
	SkillUserData.find(query, callback)
}

module.exports.addSkillsByKey = function (key, data, callback) {
	let query = { key: key }
	console.log("addSkillsByKey", key, data);
	SkillData.findOne( {_id: data[0].id}, (err, dat) => {
		console.log("findOne",err,dat);
		if (null !== dat) {
			data[0].name = dat._id;
			let updateQuery = { $addToSet: { skills: data }}
			SkillUserData.update(query, updateQuery, callback);
		} else {
			callback(null, null);
		}
	} );
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
