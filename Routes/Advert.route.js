const express = require('express');

const router = express.Router();
const authMiddleware = require('../Middleware/Auth.middleware');
const advertController = require('../Controllers/Advert.controller');

router.post('/new', authMiddleware.authenticateUser, advertController.newAdvert);

router.get('/admin/:advertId', authMiddleware.authenticateAdmin, advertController.getAdvertByAdmin);

// Update an advertisement by ID
router.put('/:id', advertController.updateAdvert);

// Delete an advertisement by ID
router.delete('/:id', advertController.deleteAdvert);

// Get all advertisements of a user
router.get('/user/:userId', advertController.getAllAdvertsOfUser);

// Get a single advertisement that has been reviewed
router.get('/:id/reviewed', advertController.getReviewedAdvert);

// Get advertisements that have been reviewed and match a search criteria
router.get('/search', advertController.getReviewedAdvertsBySearch);

// Mark an advertisement as sold and send a notification
router.put('/:id/mark-sold', advertController.markAdvertisementAsSold);

module.exports = router