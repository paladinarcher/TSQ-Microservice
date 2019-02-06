const mongoose = require('mongoose')
const config = require('../config/database')

const MarkupLanguagesSchema = mongoose.Schema({
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

const MarkupLanguageData = module.exports = mongoose.model('MarkupLanguages_Data', MarkupLanguagesSchema)

// db functions
module.exports.getMarkupLanguageDataById = function (id, callback) {}
module.exports.getMarkupLanguageDataByShortName = function (shortName, callback) {}
module.exports.getMarkupLanguageDataByDifficulty = function (difficulty, callback) {}
module.exports.getMarkupLanguageDataByFramework = function (frameworkName, callback) {}
