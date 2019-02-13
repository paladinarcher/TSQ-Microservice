const express = require('express')
const router = express.Router()
const LanguageData = require('../../models/Languages.js')

router.post('/addLanguageData', (req, res, next) => {
	const languageData = new LanguageData({
		shortName: req.body.shortName,
		skillType: 'language',
		languageType: req.body.languageType,
		averageFamiliarityScore: req.body.averageFamiliarityScore,
		usersFamiliar: req.body.usersFamiliar,
	})

	LanguageData.addLanguageData(languageData, (err, data) => {
		if (err) {
			res.json({
				success: false,
				msg: 'ERROR: ' + err
			})
		} else {
			res.json({
				success: true,
				msg: 'Data Created',
				languageData: {
					_id: data._id,
					shortName: data.shortName.toLowerCase(),
					skillType: 'language',
					languageType: data.languageType,
					averageFamiliarityScore: data.averageFamiliarityScore,
					usersFamiliar: data.usersFamiliar,
				}
			})
		}
	})
})

// TODO: fix the fs errors in /models/Languages.js and this route
// router.post('/addNewLanguageTypes', (req, res, next) => {
// 	LanguageData.addNewLanguageType(req.body.languageType, (err, data) => {
// 		if (err) {
// 				res.json({
// 					success: false,
// 					msg: err
// 				})
// 			} else {
// 				res.json({
// 					success: true,
// 					msg: data
// 				})
// 			}
// 	})
// })

router.get('/languageData', (req, res, next) => {
	if (req.query.id) {
		LanguageData.getLanguageDataById(req.query.id, (err, data) => {
			if (err) {
				res.json({
					success: false,
					msg: 'ERROR: ' + err
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	} else if (req.query.shortName) {
		LanguageData.getLanguageDataByShortName(req.query.shortName, (err, data) => {
			if (err) {
				res.json({
					success: false,
					msg: 'ERROR: ' + err
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	} else if (req.query.familiarityScore) {
		LanguageData.getLanguageDataByFamiliartyScore(req.query.familiarityScore, (err, data) => {
			if (err) {
				res.json({
					success: false,
					msg: 'ERROR: ' + err
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	} else if (req.query.languageType) {
		LanguageData.getLanguageDataByLanguageType(req.query.languageType, (err, data) => {
			if (err) {
				res.json({
					success: false,
					msg: 'ERROR: ' + err
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	} else {
		LanguageData.getAllLanguageData((err, data) => {
			if (err) {
				res.json({
					success: false,
					msg: 'ERROR: ' + err
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	}
})

// TODO: Address verifying languageType
router.put('/updateLanguageData/:id', (req, res, next) => {
	LanguageData.updateLanguageData(req.params.id, req.body, (err, data) => {
		if (err) {
				res.json({
					success: false,
					msg: 'ERROR: ' + err
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
	})
})


module.exports = router
