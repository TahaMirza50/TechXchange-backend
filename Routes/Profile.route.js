const express = require('express');

const router = express.Router();

const profileController = require('../Controllers/Profile.controller')
const authMiddleware = require('../Middleware/Auth.middleware');

router.get('/get', authMiddleware.authenticateUser, profileController.getProfile);

router.patch('/update', authMiddleware.authenticateUser, profileController.updateProfile);

router.get('/get/:profileId', authMiddleware.authenticateUser, profileController.getProfileById);

module.exports = router;