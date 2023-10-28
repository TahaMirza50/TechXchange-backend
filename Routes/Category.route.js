const express = require('express');
const router = express.Router();

const authMiddleware = require('../Middleware/Auth.middleware');
const categoryController = require('../Controllers/Category.controller');

router.post('/admin/create', authMiddleware.authenticateAdmin, categoryController.createCategory);

router.get('/admin/all', authMiddleware.authenticateAdmin, categoryController.getAllCategoriesByAdmin);

module.exports = router;
