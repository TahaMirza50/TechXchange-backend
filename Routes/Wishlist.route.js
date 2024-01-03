const express = require('express')

const router = express.Router()

const wishlistController = require('../Controllers/Wishlist.controller')
const authMiddleware = require('../Middleware/Auth.middleware')

router.patch('/add/:advertId', authMiddleware.authenticateUser,wishlistController.addAdvertWishlist)

router.patch('/remove/:advertId', authMiddleware.authenticateUser, wishlistController.removeAdvertWishlist)

router.get('/advert', authMiddleware.authenticateUser, wishlistController.getAdvertsWishlist)

router.get('/get', authMiddleware.authenticateUser, wishlistController.getWishlist)

module.exports = router