const express = require('express')
const router = express.Router()


const adminController = require('../Controllers/Admin.controller')
const authMiddleware = require('../Middleware/Auth.middleware')

router.get('/users/getusers/:rating', authMiddleware.authenticateAdmin, adminController.getUserRatings)





module.exports = router
