const express = require('express')
const router = express.Router()
const SkillUserData = require('../../models/SkillsUser')


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
router.post('/register', (request, response, next) => {
	let userData = new SkillUserData()
	if (request.body.skills) {
		let data = request.body.skills.filter(obj => obj.hasOwnProperty('name'))
		userData.skills = data
		SkillUserData.registerUserData(userData, (err, data) => {
			if (err) {
				return errorResponseJson(response, err)
			} else {
				const payload = { _id: data._id, key: data.key, skills: data.skills }
				return successResponseJson(response, 'Entry has been created!', payload)
			}
		})
	// no request body skills param
	} else {
		SkillUserData.registerUserData(userData, (err, data) => {
			if (err) {
				return errorResponseJson(response, err)
			} else {
				const payload = { _id: data._id, key: data.key, skills: data.skills }
				return successResponseJson(response, 'Entry has been created!', payload)
			}
		})
	}
})

// GET
router.get('/findAll', (request, response, next) => {
	SkillUserData.getAllUserData((error, data) => {
		if (error) {
			return errorResponseJson(response, error)
		} else {
			let payload = { entries: data.length, payload: data }
			return successResponseJson(response, 'Query Successful', payload)
		}
	})
})

router.get('/findOne/id/:id', (request, response, next) => {
	SkillUserData.getUserDataById(request.params.id, (error, data) => {
		if (error) {
			return errorResponseJson(response, error)
		} else {
			let payload = { payload: data }
			return successResponseJson(response, 'Query Successful', payload)
		}
	})
})

router.get('/findOne/key/:key', (request, response, next) => {
	SkillUserData.getUserDataByKey(request.params.key, (error, data) => {
		if (error) {
			return errorResponseJson(response, error)
		} else {
			let payload = { payload: data }
			return successResponseJson(response, 'Query Successful', payload)
		}
	})
})

// PUT
router.put('update/id/:id', (request, response, next) => { response.send('not built') })
router.put('update/key/:key', (request, response, next) => { response.send('not built') })

// DELETE
router.delete('remove/id/:id', (request, response, next) => { response.send('not built') })
router.delete('remove/key/:key', (request, response, next) => { response.send('not built') })


module.exports = router
