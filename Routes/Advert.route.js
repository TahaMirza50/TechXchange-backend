const express = require('express');

const router = express.Router();
const authMiddleware = require('../Middleware/Auth.middleware');
const advertController = require('../Controllers/Advert.controller');

router.post('/new', authMiddleware.authenticateUser, advertController.newAdvert);

router.get('/admin/:advertId', authMiddleware.authenticateAdmin, advertController.getAdvertByAdmin);

module.exports = router