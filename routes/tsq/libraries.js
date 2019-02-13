const express = require('express')
const router = express.Router()
const LibraryData = require('../../models/Libraries')

//
// Functions
//

const checkEmptyObj = function (obj) {
	return !!(Object.keys(obj).length === 0 && obj.constructor === Object)
}

//
// Routes
//

// POST
router.post('/libraries/addLibraryData', (req, res, next) => {})

// GET
router.get('/libraryData', (req, res, next) => {

	if (checkEmptyObj(req.query)) {
		console.log('there are no query params, display all the results')
	} else {
		if (req.query.id) {}
		if (req.query.shortName) {}
		if (req.query.laguage) {}
		if (req.query.familiarityScore) {}
	}

	return res.send('Invalid')
})
// PUT

router.put('/libraries/updateLibraryData/:id', (req, res, next) => {})

// DELETE
router.delete('/libraries/removeLibraryData/:id', (req, res, next) => {})

module.exports = router
