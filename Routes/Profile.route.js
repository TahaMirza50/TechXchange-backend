const Router = require('express');

const router = Router();

const profileController = require('../Controllers/Profile.controller')
const authMiddleware = require('../Middleware/Auth.middleware');

router.get('/getprofile', authMiddleware.authenticateUser, profileController.getProfile);

router.patch('/updateprofile', authMiddleware.authenticateUser, profileController.updateProfile)

module.exports = router;