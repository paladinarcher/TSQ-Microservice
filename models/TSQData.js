const mongoose = require('mongoose')
const config = require('../config/database')
const rand = require('random-key')

const TSQDataSchema = mongoose.Schema({
	skillList: {
		type: Array,
		default: () => [],
		required: true
	},
	uKey: {
		type: String,
		default: () => rand.generate(),
		required: true
	}
})

const TSQData = module.exports = mongoose.model('TSQData', TSQDataSchema)

// db functions
module.exports.createTSQ = function (data, callback) {
	data.ukey = rand.generate()
 	data.save(callback)
}

module.exports.getAllTSQData = function (callback) {
	TSQData.find({}, callback)
}

module.exports.getTSQDataById = function (id, callback) {
	TSQData.findById(id, callback)
}

module.exports.getTSQDataByKey = function (ukey, callback) {
	const query = { uKey: ukey }
	TSQData.findOne(query, callback)
}

 module.exports.updateSkillListByKey = function (ukey, skillList, callback) {
 	const query = { uKey: ukey }
 	TSQData.update(query, { $set: skillList }, callback)
 }

module.exports.updateSkillListById = function (id, skillList, callback) {
	const query = { _id: id }
	TSQData.update(query, { $set: skillList }, callback)
}

module.exports.removeTSQByKey = function (key, callback) {
	const query = { uKey: key }
	TSQData.deleteOne(query, callback)
}


module.exports.removeTSQById = function (id, callback) {
	const query = { _id: id }
	TSQData.deleteOne(query, callback)
}
