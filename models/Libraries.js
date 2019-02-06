const mongoose = require('mongoose')
const config = require('../config/database')

const LibrariesSchema = mongoose.Schema({
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

const LibrariesData = module.exports = mongoose.model('Libraries_Data', LibrariesSchema)

// db functions
module.exports.getLibraryDataById = function (id, callback) {}
module.exports.getLibraryDataByShortName = function (shortName, callback) {}
module.exports.getLibraryDataByDifficulty = function (difficulty, callback) {}
module.exports.getLibraryDataByFramework = function (frameworkName, callback) {}
