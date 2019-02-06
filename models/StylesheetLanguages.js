const mongoose = require('mongoose')
const config = require('../config/database')

const StylesheetLanguagesSchema = mongoose.Schema({
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

const StylesheetLanguageData = module.exports = mongoose.model('StylesheetLanguages_Data', StylesheetLanguagesSchema)

// db functions
module.exports.getStylesheetLanguageDataById = function (id, callback) {}
module.exports.getStylesheetLanguageDataByShortName = function (shortName, callback) {}
module.exports.getStylesheetLanguageDataByDifficulty = function (difficulty, callback) {}
module.exports.getStylesheetLanguageDataByFramework = function (frameworkName, callback) {}
