const mongoose = require('mongoose')
const config = require('../config/database')

const QueryLanguagesSchema = mongoose.Schema({
	shortName: {
		type: String,
	},
	estimatedDifficulty: {
		type: Number
	},
	usersFamiliar: {
		type: Number
	},
	presentInFrameworks: {
		type: [Object]
	}
})

const QueryLanguageData = module.exports = mongoose.model('QueryLanguages_Data', QueryLanguagesSchema)

// db functions
module.exports.getQueryLanguageDataById = function (id, callback) {}
module.exports.getQueryLanguageDataByShortName = function (shortName, callback) {}
module.exports.getQueryLanguageDataByDifficulty = function (difficulty, callback) {}
module.exports.getQueryLanguageDataByFramework = function (frameworkName, callback) {}
