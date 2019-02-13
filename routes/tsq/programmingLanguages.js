const express = require('express')
const router = express.Router()
const ProgrammingLanguageData = require('../../models/ProgrammingLanguages.js')

router.post('/addProgrammingLanguageData', (req, res, next) => {
	const languageData = new ProgrammingLanguageData({
		shortName: req.body.shortName,
		skillType: 'language',
		averageFamiliarityScore: req.body.averageFamiliarityScore,
		usersFamiliar: req.body.usersFamiliar,
		presentInFrameworks: req.body.presentInFrameworks
	})

	ProgrammingLanguageData.addProgrammingLanguageData(languageData, (err, data) => {
		if (err) {
			res.json({
				success: false,
				msg: 'There was an error' + err
			})
		} else {
			res.json({
				success: true,
				msg: 'Data Created',
				languageData: {
					_id: data._id,
					shortName: data.shortName.toLowerCase(),
					skillType: 'language',
					averageFamiliarityScore: data.averageFamiliarityScore,
					usersFamiliar: data.usersFamiliar,
					presentInFrameworks: data.presentInFrameworks
				}
			})
		}
	})
})

router.get('/programmingLanguageData', (req, res, next) => {
	if (req.query.id) {
		ProgrammingLanguageData.getProgrammingLanguageDataById(req.query.id, (err, data) => {
			if (err) {
				res.json({
					success: false,
					msg: 'There was an error'
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	} else if (req.query.shortName) {
		ProgrammingLanguageData.getProgrammingLanguageDataByShortName(req.query.shortName, (err, data) => {
			if (err) {
				res.json({
					success: false,
					msg: 'There was an error'
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	} else if (req.query.familiarityScore) {
		ProgrammingLanguageData.getProgrammingLanguageDataByFamiliartyScore(req.query.familiarityScore, (err, data) => {
			if (err) {
				res.json({
					success: false,
					msg: 'There was an error'
				})
			} else {
				res.json({
					success: true,
					data: data
				})
			}
		})
	} else {
		ProgrammingLanguageData.getAllProgrammingLanguageData((err, data) => {
			if (err) {
				res.json({
					success: false,
					msg: 'There was an error'
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


module.exports = router
