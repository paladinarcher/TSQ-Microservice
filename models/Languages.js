const mongoose = require('mongoose')
const config = require('../config/database')
const fs = require('fs')
const languageTypesArray = require('./data/languageTypes')

const LanguageDataSchema = mongoose.Schema({
	shortName: {
		type: String,
		required: true,
	},
	skillType: {
		type: String,
		default: 'language',
		required: true,
	},
	languageType: {
		type: String,
		default: 'uncategorized',
		required: true,
	},
	averageFamiliarityScore: {
		type: Number,
		default: 0,
		required: true,
	},
	usersFamiliar: {
		type: Number,
		default: 0,
		required: true,
	},
})

const LanguageData = module.exports = mongoose.model('LanguageData', LanguageDataSchema)

// db functions
module.exports.addLanguageData = function (languageData, callback) {
	console.log(languageTypesArray.indexOf(languageData.languageType))
	if (!(languageTypesArray.indexOf(languageData.languageType) <= -1)) {
		languageData.save(callback)
	} else {
		callback(' the languageType Did not match one of the current languageTypes - ' + languageTypesArray.toString(), null)
	}
}


module.exports.getAllLanguageData = function (callback) {
	LanguageData.find({}, callback)
}


module.exports.getLanguageDataById = function (id, callback) {
	let query = { _id: id }
	LanguageData.findOne(query, callback)
}


module.exports.getLanguageDataByShortName = function (shortName, callback) {
	let query = { shortName: shortName.toLowerCase() }
	LanguageData.findOne(query, callback)
}


module.exports.getLanguageDataByFamiliartyScore = function (familiarityScore, callback) {
	let query = { averageFamiliarityScore: Number(familiarityScore) }
	LanguageData.find(query, callback)
}


module.exports.getLanguageDataByLanguageType = function (languageType, callback) {
	let query = { languageType: languageType }
	LanguageData.find(query, callback)
}

module.exports.getLanguageDataByNumberOfUsersFamiliar = function (usersFamiliar, callback) {

}


module.exports.updateLanguageData = function (id, updates, callback) {
	let query = { _id: id }
	LanguageData.update(query, { $set: updates }, callback)
}

module.exports.removeLanguageDataById = function (id, callback) {}



module.exports.calculateAverageFamiliartyScore = function (callback) {
	const data = LanguageData.find({}).fetch()
	const avg = data.reduce((previous, current) => {
	  // still need to build this out
	}, initial)
}

// TODO: fix the fs errors
// module.exports.addNewLanguageType = function (languageType, callback) {
// 	if (typeof(languageType) == 'string') {
// 		let newLangTypeArr = languageTypesArray.push(languageType)
// 		fs.writeFile('./data/languageTypes.js', newLangTypeArr, {encoding: 'UTF-8', flag: 'w'}, (err, data) => {
// 			if (err) callback(err, null)
// 		})
// 		return callback(null, 'languageTypes updated. ' + languageTypesArray.toString())
// 	} else {
// 		return callback('TYPE ERROR: Use a string', null)
// 	}
// }
