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
		name: req.body.name.trim(),
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
			if (!data || data.length === null) {
				res.status(404)
				let payload = { entries: 0, payload: data }
				return successResponseJson(res, 'No Skill Found By that Id', payload)
			}
			let payload = { entries: data.length, payload: data }
			return successResponseJson(res, 'Skill Entry Located', payload)
		}
	})

	// GET by name
	} else if (req.query.name && req.query.name !== '') {
		SkillData.getSkillByName(req.query.name, (err, data) => {
			if (err) {
				return errorResponseJson(res, err)
			} else {
				let payload = { payload: data }
				if (data === null) {
					res.status(404)
					return successResponseJson(res, 'No Match, Not Found', payload)
				}
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

router.get('/randomSkills/:number', (request, response, next) => {
	if (request.params.number > 0) {
		SkillData.getRandomSampleOfSkills(request.params.number, (error, data) => {
			if (error) {
				console.log(error)
				return errorResponseJson(response, error)
			} else {
				let payload = { payload: data }
				return successResponseJson(response, 'Query Complete', payload)
			}
		})
	}
})

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
