const express = require('express');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
const authMiddleware = require('../Middleware/Auth.middleware');
const advertController = require('../Controllers/Advert.controller');

router.post('/new', authMiddleware.authenticateUser, advertController.newAdvert);

router.patch('/new/upload/:advertId', authMiddleware.authenticateUser,upload.array('images', 5), advertController.newAdvertUploadImage);

router.get('/admin/get/:advertId', authMiddleware.authenticateAdmin, advertController.getAdvertByAdmin);

router.patch('update/:advertId', authMiddleware.authenticateUser, advertController.updateAdvert);

// Delete an advertisement by ID
// router.delete('/:id', advertController.deleteAdvert);

router.get('/get', authMiddleware.authenticateUser, advertController.getAllAdvertsOfUser);

router.get('/get/:advertId', authMiddleware.authenticateUser, advertController.getAdvert);

router.get('/get/:categoryId', authMiddleware.authenticateUser ,advertController.getAdvertsByCategory);

// Get advertisements that have been reviewed and match a search criteria
// router.get('/search', advertController.getReviewedAdvertsBySearch);

// // Mark an advertisement as sold and send a notification
// router.put('/:id/mark-sold', advertController.markAdvertisementAsSold);

router.patch('/admin/approve/:advertId', authMiddleware.authenticateAdmin ,advertController.approveAdvertByAdmin);

router.patch('/admin/reject/:advertId', authMiddleware.authenticateAdmin ,advertController.rejectAdvertByAdmin);

router.get('/admin/get', authMiddleware.authenticateAdmin, advertController.getInReviewAdvertByAdmin);

module.exports = router