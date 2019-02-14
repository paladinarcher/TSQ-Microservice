const express = require('express')
const router = express.Router()
const SkillData = require('../../models/Skills')
const url = require('url');
const querystring = require('querystring');

// POST
router.post('/', (req, res, next) => {
	let skill = new SkillData({
		name: req.body.name,
		tags: req.body.tags,
		keys: req.body.keys,
	})

	SkillData.addNewSkill(skill, (err, data) => {
		if (err) {
			return res.json({
				success: false,
				msg: 'ERROR: ' + err
			})
		} else {
			return res.json({
				success: true,
				msg: 'Data Created',
				data: data
			})
		}
	})
})

// GET
router.get('/', (req, res, next) => {

	// by id
	if (req.query.id) {
		SkillData.getSkillById(req.query.id, (err, data) => {
			if (err) {
			return res.json({
				success: false,
				msg: 'ERROR: ' + err
			})
		} else {
			return res.json({
				success: true,
				msg: 'Entry Located',
				data: data
			})
		}
		})

	// GET by tags
	} else if (req.query.tags) {
		let tags = req.query.tags.toString().split(',')
		SkillData.getAllSkillsByTags(tags, (err, data) => {
			if (err) {
				return res.json({
					success: false,
					msg: 'ERROR: ' + err
				})
			} else {
				if (data.length == 0) {
					res.status(404)
					return res.json({
						success: true,
						msg: 'No Match',
						entries: data.length,
						data: data
					})
				}
				return res.json({
					success: true,
					msg: 'Query Complete',
					entries: data.length,
					data: data
				})
			}
		})

	// find all
	} else {
		SkillData.getAllSkills((err, data) => {
			if (err) {
				return res.json({
					success: false,
					msg: 'ERROR: ' + err
				})
			} else {
				return res.json({
					success: true,
					msg: 'Query Complete',
					entries: data.length,
					data: data
				})
			}
		})
	}

}) // end GET /

// PUT
// TODO: fix the db is not updating issue
router.put('/updateName/:id', (req, res, next) => {
	if (req.params.id) {
		SkillData.updateSkillName(req.param.id, req.body.name, (err, data) => {
			if (err) {
				return res.json({
					success: false,
					msg: 'ERROR: ' + err
				})
			} else {
				return res.json({
					success: true,
					msg: 'Update Complete',
					data: data
				})
			}
		})
	}
})

// DELETE
router.delete('/remove/:id', (req, res, next) => { res.send('Delete Not Built Yet') })

module.exports = router
