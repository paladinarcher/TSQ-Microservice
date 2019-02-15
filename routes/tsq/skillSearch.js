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
router.put('/updateName/:id', (req, res, next) => {
	if (req.body.name) {
		SkillData.updateSkillName(req.params.id, req.body, (err, data) => {
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
	} else {
		return res.json({
			success: false,
			msg: 'ERROR: the key should be labeled name & the value should contain a string',
			data: null
		})
	}
})

router.put('/updateTags/:id', (req, res, next) => {
	SkillData.updateSkillTags(req.params.id, req.query, req.body, (err, data) => {
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
})

// DELETE
router.delete('/removeEntry/:id', (req, res, next) => {
	SkillData.removeSkill(req.params.id, (err, data) => {
		if (err) {
			return res.json({
				success: false,
				msg: 'ERROR: ' + err
			})
		} else {
			return res.json({
				success: true,
				msg: 'Skill Entry Removed',
				data: data
			})
		}
	})
})

module.exports = router
