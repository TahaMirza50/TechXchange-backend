const express = require('express')
const router = express.Router()


const adminController = require('../Controllers/Admin.controller')
const authMiddleware = require('../Middleware/Auth.middleware')

router.get('/users/getusers/:rating', authMiddleware.authenticateAdmin, adminController.getUserRatings)

// Update and approve an advertisement in review and send a notification
router.put('/approve-review/:id', adminController.approveReviewAdvertisement);



module.exports = router
