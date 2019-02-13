const mongoose = require('mongoose')
const config = require('../config/database')

const LibrariesSchema = mongoose.Schema({
	shortName: {
		type: String,
		required: true,
	},
	skillType: {
		type: String,
		default: 'library',
		required: true,
	},
	languages: {
		type: [String],
		default: [],
		required: true,
	},
	avgFamiliarityScore: {
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

const LibraryData = module.exports = mongoose.model('LibrariesData', LibrariesSchema)

// db functions
