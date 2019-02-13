const mongoose = require('mongoose')
const config = require('../config/database')

const HighLevelConcepts = mongoose.Schema({

})

const HighLevelConceptsData = module.exports = mongoose.model('HighLevelConcepts_Data', HighLevelConceptsSchema)

// db functions
module.exports.getHighLevelConceptsDataById = function (id, callback) {}
module.exports.getHighLevelConceptsDataByShortName = function (shortName, callback) {}
module.exports.getHighLevelConceptsDataByDifficulty = function (difficulty, callback) {}
module.exports.getHighLevelConceptsDataByFramework = function (frameworkName, callback) {}
