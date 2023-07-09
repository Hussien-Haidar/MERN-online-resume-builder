const express = require('express')
const requireAuth = require('../middlewares/requireAuth')

// controller functions
const { signupUser, loginUser, updateUser, getUser, deleteUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// use method will run first, if authorization verified it will continue to the wanted request
router.use(requireAuth)

//get user
router.get('/:id', getUser)

//update user
router.patch('/edit/:id', updateUser)

//delete user
router.delete('/delete/:id', deleteUser)

module.exports = router