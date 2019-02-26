const express = require('express')
const router = express.Router()
const SkillData = require('../../models/Skills')
const url = require('url');
const querystring = require('querystring');

// functions
const errorResponseJson = (response, error) => {
	return response.json({
		success: false,
		message: error,
		data: null,
	})
}

const successResponseJson = (response, message, payload) => {
	return response.json({
		success: true,
		message: message,
		data: payload,
	})
}

// POST
router.post('/', (req, res, next) => {
	let skill = new SkillData({
		name: req.body.name,
		tags: req.body.tags,
		keys: req.body.keys,
	})

	SkillData.addNewSkill(skill, (err, data) => {
		if (err) {
			return errorResponseJson(res, err)
		} else {
			return successResponseJson(res, 'Skill Entry Created', data)
		}
	})
})

// GET
router.get('/', (req, res, next) => {
	// by id
	if (req.query.id) {
		SkillData.getSkillById(req.query.id, (err, data) => {
			if (err) {
			return errorResponseJson(res, err)
		} else {
			let payload = { entries: data.length, payload: data }
			return successResponseJson(res, 'Skill Entry Located', payload)
		}
	})

	// GET by tags
	} else if (req.query.tags) {
		let tags = req.query.tags.toString().split(',')
		SkillData.getAllSkillsByTags(tags, (err, data) => {
			if (err) {
				return errorResponseJson(res, err)
			} else {
				let payload = { entries: data.length, payload: data }
				if (data.length == 0) {
					res.status(404)
					return successResponseJson(res, 'No Match, Not Found', payload)
				}
				return successResponseJson(res, 'Query Complete', payload)
			}
		})

	// find all
	} else {
		SkillData.getAllSkills((err, data) => {
			if (err) {
				return errorResponseJson(res, err)
			} else {
				let payload = { entries: data.length, payload: data }
				return successResponseJson(res, 'Query Complete', payload)
			}
		})
	}
}) // end GET /

// PUT
router.put('/updateName/:id', (req, res, next) => {
	if (req.body.name) {
		SkillData.updateSkillName(req.params.id, req.body, (err, data) => {
			if (err) {
				return errorResponseJson(res, err)
			} else {
				return successResponseJson(res, 'Update Complete', data)
			}
		})
	} else {
		return errorResponseJson(res, 'ERROR: the key should be labeled name & the value should contain a string')
	}
})

router.put('/updateTags/:id', (req, res, next) => {
	SkillData.updateSkillTags(req.params.id, req.query, req.body, (err, data) => {
		if (err) {
				return errorResponseJson(res, err)
			} else {
				return successResponseJson(res, 'Update Complete', data)
			}
	})
})

// DELETE
router.delete('/removeEntry/:id', (req, res, next) => {
	SkillData.removeSkill(req.params.id, (err, data) => {
		if (err) {
			return errorResponseJson(res, err)
		} else {
			return successResponseJson(res, 'Skill Entry Removed', data)
		}
	})
})

module.exports = router
