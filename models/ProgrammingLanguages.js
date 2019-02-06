const mongoose = require('mongoose')
const config = require('../config/database')

const ProgrammingLanguagesSchema = mongoose.Schema({
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

const ProgrammingLanguageData = module.exports = mongoose.model('ProgrammingLanguages_Data', ProgrammingLanguagesSchema)

// db functions
module.exports.getProgrammingLanguageDataById = function (id, callback) {}
module.exports.getProgrammingLanguageDataByShortName = function (shortName, callback) {}
module.exports.getProgrammingLanguageDataByDifficulty = function (difficulty, callback) {}
module.exports.getProgrammingLanguageDataByFramework = function (frameworkName, callback) {}
