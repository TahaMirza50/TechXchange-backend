const express = require('express');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
const authMiddleware = require('../Middleware/Auth.middleware');
const advertController = require('../Controllers/Advert.controller');

router.post('/new', authMiddleware.authenticateUser, advertController.newAdvert);

router.patch('/new/upload/:advertId', authMiddleware.authenticateUser,upload.array('images', 5), advertController.newAdvertUploadImage);

router.get('/admin/:advertId', authMiddleware.authenticateAdmin, advertController.getAdvertByAdmin);

router.get('/', authMiddleware.authenticateUser, advertController.getAdvertbySearchQuery)

module.exports = router