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
	// presentInFrameworks: {
	// 	type: [Object]
	// }
})

const ProgrammingLanguageData = module.exports = mongoose.model('ProgrammingLanguages_Data', ProgrammingLanguagesSchema)

// db functions
module.exports.addLanguageData = function (languageData, callback) {
	languageData.save(callback)
}


module.exports.getAllLanguageData = function (callback) {
	ProgrammingLanguageData.find({}, callback)
}


module.exports.getLanguageDataById = function (id, callback) {
	let query = { _id: id }
	ProgrammingLanguageData.findOne(query, callback)
}


module.exports.getLanguageDataByShortName = function (shortName, callback) {
	let query = { shortName: shortName.toLowerCase() }
	ProgrammingLanguageData.findOne(query, callback)
}


module.exports.getLanguageDataByFamiliartyScore = function (familiarityScore, callback) {
	let query = { averageFamiliarityScore: Number(familiarityScore) }
	ProgrammingLanguageData.find(query, callback)
}


module.exports.getLanguageDataByNumberOfUsersFamiliar = function (usersFamiliar, callback) {

}


module.exports.removeLanguageDataById = function (id, callback) {}


module.exports.calculateAverageFamiliartyScore = function (callback) {
	const data = ProgrammingLanguageData.find({}).fetch()
	const avg = data.reduce((previous, current) => {
	  // still need to build this out
	}, initial)
}
