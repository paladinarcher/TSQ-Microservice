const mongoose = require('mongoose')
const config = require('../config/database')

const ProgrammingLanguagesSchema = mongoose.Schema({
	shortName: {
		type: String,
	},
	skillType: {
		type: String,
		default: 'language'
	},
	averageFamiliarityScore: {
		type: Number
	},
	usersFamiliar: {
		type: Number
	},
	presentInFrameworks: {
		type: [Object]
	}
})

const ProgrammingLanguageData = module.exports = mongoose.model('ProgrammingLanguages_Data', ProgrammingLanguagesSchema)

// db functions
module.exports.addProgrammingLanguageData = function (languageData, callback) {
	languageData.save(callback)
}

module.exports.getAllProgrammingLanguageData = function (callback) {
	ProgrammingLanguageData.find({}, callback)
}

module.exports.getProgrammingLanguageDataById = function (id, callback) {
	let query = { _id: id }
	ProgrammingLanguageData.findOne(query, callback)
}
module.exports.getProgrammingLanguageDataByShortName = function (shortName, callback) {
	let query = { shortName: shortName.toLowerCase() }
	ProgrammingLanguageData.findOne(query, callback)
}
module.exports.getProgrammingLanguageDataByFamiliartyScore = function (familiarityScore, callback) {
	let query = { averageFamiliarityScore: Number(familiarityScore) }
	ProgrammingLanguageData.find(query, callback)
}

module.exports.getProgrammingLanguageDataByNumberOfUsersFamiliar = function (difficulty, callback) {}
