const express = require('express');
const router = express.Router();
const { createCategory,categoryController, getAllCategories} = require('../Controllers/Category.controller');

// Get all advertisements in a specific category
router.get('/:categoryName/adverts', categoryController.getAdvertsByCategory);

// Route to create a category by an admin
router.post('/admin/create', createCategory);

// Route to get all categories by an admin
router.get('/admin/all', getAllCategories);

module.exports = router;
