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

router.delete('/:advertId/delete', authMiddleware.authenticateUser, advertController.deleteAdvert);

router.get('/get', authMiddleware.authenticateUser, advertController.getAllAdvertsOfUser);

router.get('/get/:advertId', authMiddleware.authenticateUser, advertController.getAdvert);

router.get('/get/:categoryId', authMiddleware.authenticateUser ,advertController.getAdvertsByCategory);

router.patch('/:advertId/mark-sold', authMiddleware.authenticateUser, advertController.markAdvertSold);

router.patch('/admin/approve/:advertId', authMiddleware.authenticateAdmin ,advertController.approveAdvertByAdmin);

router.patch('/admin/reject/:advertId', authMiddleware.authenticateAdmin ,advertController.rejectAdvertByAdmin);

router.get('/admin/get', authMiddleware.authenticateAdmin, advertController.getInReviewAdvertByAdmin);

router.get('/', authMiddleware.authenticateUser, advertController.getAdvertbySearchQuery)

module.exports = router