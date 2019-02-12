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
			return res.json({
				success: true,
				TSQData: {
					id: data._id,
					skillList: data.skillList,
					key: data.uKey
				}
			})
		})

	} else if (req.query.key) {
		let key = req.query.key
		TSQData.getTSQDataByKey(key, (err, data) => {
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
			return res.json({
				success: true,
				TSQData: {
					id: data._id,
					skillList: data.skillList,
					key: data.uKey
				}
			})
		})

	} else {
		res.send('This endpoint is for Technical Skills Questionaire data and documentation!')
	}

})

router.post('/createTSQ', (req, res, next) => {
	let newTSQ = new TSQData({
		skillList: req.body.skillList,
	})

	TSQData.createTSQ(newTSQ, (err, data) => {
		if (err) {
			res.json({
				success: false,
				msg: 'Failed to create TSQ Data Entry'
			})
		} else {
			res.json({
				success: true,
				msg: 'TSQ Data Entry Created!',
				id: data._id,
				key: data.uKey
		})
		}
	})
})


router.put('/updateSkillListByKey/:key', (req, res, next) => {
	TSQData.updateSkillListByKey(req.params.key, req.body, (err, rslt) => {
		if (err) {
			res.json({
				success: false,
				msg: err
			})
		} else {
			res.json({
				success: true,
				msg: 'TSQ Skill List entry has been updated!',
			})
		}

	})
})


router.put('/updateSkillListById/:id', (req, res, next) => {
	TSQData.updateSkillListById(req.params.id, req.body, (err, rslt) => {
			if (err) {
				res.json({
					success: false,
					msg: err
				})
			} else {
				res.json({
					success: true,
					msg: 'TSQ Skill List entry has been updated'
				})
			}
	})
})


router.delete('/removeTSQByKey/:key', (req, res, next) => {
	TSQData.removeTSQByKey(req.params.key, (err, rslt) => {
		if (err) {
			res.json({
				success: false,
				msg: err
			})
		} else {
			res.json({
				success: true,
				msg: 'Entry removed'
			})
		}
	})
})


// router.delete('/removeTSQById/:id', (req, res, next) => {})

module.exports = router
