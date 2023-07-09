const express = require('express')
const requireAuth = require('../middlewares/requireAuth')

const {
    getResumes,
    getResume,
    createResume,
    deleteResume,
    updateResume
} = require('../controllers/resumeController');

const router = express.Router()

// use method will run first, if authorization verified it will continue to the wanted request
router.use(requireAuth)

// GET all Resumes
router.get('/', getResumes)

// GET a single Resume
router.get('/:id', getResume)

// POST a new Resume
router.post('/', createResume)

// DELETE a Resume
router.delete('/:id', deleteResume)

// UPDATE a Resume
router.patch('/edit/:id', updateResume)

module.exports = router