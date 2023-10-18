const Router = require('express');

const router = Router();
const authController = require('../Controllers/Auth.controller');

router.post('/register',authController.register);

module.exports = router;