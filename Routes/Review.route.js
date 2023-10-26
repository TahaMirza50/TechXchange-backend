const express = require('express')
const router = express.Router()


const reviewController = require('../Controllers/Review.controller')
const authMiddleware = require('../Middleware/Auth.middleware')

router.get('/', authMiddleware.authenticateUser, reviewController.getReviews)

router.post('/new', authMiddleware.authenticateUser, reviewController.createReview)


module.exports = router
