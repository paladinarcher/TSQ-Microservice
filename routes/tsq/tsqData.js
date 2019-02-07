const express = require('express')
const router = express.Router()
const config = require('../../config/database')
const url = require('url');
const querystring = require('querystring');
const TSQData = require('../../models/TSQData')

router.get('/', (req, res, next) => {
	// TODO: send a documentation page on this endpoint here!
	console.log(req.params)

	if (req.query.id) {
		let id = req.query.id
		TSQData.getTSQDataById(id, (err, data) => {
			if (err) {
				return res.json({
					success: false,
					msg: 'There was an error ',
					error: err
				})
			}
			if (!data) {
				res.status(404)
				return res.json({
					success: false,
					msg: 'technical skills questionaire entry not found'
				})
			}
			return res.json({ success: true, TSQData: data })
		})

	} else {
		res.send('This endpoint is for Technical Skills Questionaire data!')
	}

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
