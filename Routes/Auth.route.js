const Router = require('express');

const router = Router();
const authController = require('../Controllers/Auth.controller');
const authMiddleware = require('../Middleware/Auth.middleware');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/getaccesstoken', authMiddleware.authenticateRefresh, authController.getAccessToken);

module.exports = router;