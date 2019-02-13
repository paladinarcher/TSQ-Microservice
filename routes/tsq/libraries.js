const express = require('express')
const router = express.Router()
const LibraryData = require('../../models/Libraries')


// POST
router.post('/libraries/addLibraryData', (req, res, next) => {})

// GET
router.get('/libraries/', (req, res, next) => {})

// PUT
router.put('/libraries/updateLibraryData/:id', (req, res, next) => {})

// DELETE
router.delete('/libraries/removeLibraryData/:id', (req, res, next) => {})

module.exports = router
