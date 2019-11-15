const express = require('express')
const router = express.Router()
const url = require('url');



const successResponseJson = (response, message, payload) => {
	return response.json({
		success: true,
		message: message,
		data: payload,
	})
}

// GET
router.get('/', (req, res, next) => {
	let data = 'tochange';
	// console.log('health check tsq');
	// res.writeHead(202);
	// res.write('404 not found');
	// return res.end();
	res.statusCode = 200;
	return successResponseJson(res, 'Skill Entry Created', data)
//	// by id
//	if (req.query.id) {
//		SkillData.getSkillById(req.query.id, (err, data) => {
//			if (err) {
//			return errorResponseJson(res, err)
//		} else {
//			if (!data || data.length === null) {
//				res.status(404)
//				let payload = { entries: 0, payload: data }
//				return successResponseJson(res, 'No Skill Found By that Id', payload)
//			}
//			let payload = { entries: data.length, payload: data }
//			return successResponseJson(res, 'Skill Entry Located', payload)
//		}
//	})
//
//	// GET by name
//	} else if (req.query.name && req.query.name !== '') {
//		SkillData.getSkillByName(req.query.name, (err, data) => {
//			if (err) {
//				return errorResponseJson(res, err)
//			} else {
//				let payload = { payload: data }
//				if (data === null) {
//					res.status(404)
//					return successResponseJson(res, 'No Match, Not Found', payload)
//				}
//				return successResponseJson(res, 'Skill Entry Located', payload)
//			}
//		})
//
//	// GET by tags
//	} else if (req.query.tags) {
//		let tags = req.query.tags.toString().split(',')
//		SkillData.getAllSkillsByTags(tags, (err, data) => {
//			if (err) {
//				return errorResponseJson(res, err)
//			} else {
//				let payload = { entries: data.length, payload: data }
//				if (data.length == 0) {
//					res.status(404)
//					return successResponseJson(res, 'No Match, Not Found', payload)
//				}
//				return successResponseJson(res, 'Query Complete', payload)
//			}
//		})
//
//	// find all
//	} else {
//		SkillData.getAllSkills((err, data) => {
//			if (err) {
//				return errorResponseJson(res, err)
//			} else {
//				let payload = { entries: data.length, payload: data }
//				return successResponseJson(res, 'Query Complete', payload)
//			}
//		})
//	}
}) // end GET /


module.exports = router
