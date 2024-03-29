const express = require('express');

const router = express.Router();

const authController = require('../Controllers/Auth.controller');
const authMiddleware = require('../Middleware/Auth.middleware');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/get-access-token', authMiddleware.authenticateRefresh, authController.getAccessToken);

router.get('/logout',authController.logout); 

module.exports = router;