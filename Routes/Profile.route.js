const express = require('express');

const router = express.Router();

const profileController = require('../Controllers/Profile.controller')
const authMiddleware = require('../Middleware/Auth.middleware');

router.get('/getprofile', authMiddleware.authenticateUser, profileController.getProfile);

router.patch('/updateprofile', authMiddleware.authenticateUser, profileController.updateProfile);

router.get('/getprofile/:profileId', authMiddleware.authenticateUser, profileController.getProfileById);

module.exports = router;