const express = require('express')
const router = express.Router()


const { approveAdvert,rejectAdvert, sendNotification, adminController } = require('../Controllers/Admin.controller')
const authMiddleware = require('../Middleware/Auth.middleware')

router.get('/users/getusers/:rating', authMiddleware.authenticateAdmin, adminController.getUserRatings)

// Update and approve an advertisement in review and send a notification
router.put('/approve-review/:id', adminController.approveReviewAdvertisement);

// Route to approve a review advertisement by admin
router.put('/adverts/approveadvert/:advertId', approveAdvert);

// Route to reject a review advertisement by admin
router.put('/adverts/rejectadvert/:advertId', rejectAdvert);

module.exports = router
