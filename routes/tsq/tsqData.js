const express = require('express')
const router = express.Router()
const config = require('../../config/database')

const TSQData = require('../../models/TSQData')

router.get('/', (req, res, next) => {
	// TODO: send a documentation page on this endpoint here!
	res.send('This endpoint is for Technical Skills Questionaire data!')
})

router.post('/createTSQ', (req, res, next) => {
	let newTSQ = new TSQData({
		skillList: req.body.skillList,
	})

	TSQData.createTSQ(newTSQ, (err, tsqdata) => {
		if (err) {
			res.json({ success: false, msg: 'Failed to create TSQ Data Entry'})
		} else {
			res.json({ success: true, msg: 'TSQ Data Entry Created!'})
		}
	})
})

module.exports = router
