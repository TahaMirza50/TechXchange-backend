const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/Category.controller');

// Get all advertisements in a specific category
router.get('/:categoryName/adverts', categoryController.getAdvertsByCategory);

module.exports = router;
