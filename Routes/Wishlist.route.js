const express = require('express')

const router = express.Router()

const wishlistController = require('../Controllers/Wishlist.controller')
const authMiddleware = require('../Middleware/Auth.middleware')

router.post('/add/:advertId', authMiddleware.authenticateUser,wishlistController.addAdvertWishlist)

router.delete('/remove/:advertId', authMiddleware.authenticateUser, wishlistController.removeAdvertWishlist)

router.get('/advert', authMiddleware.authenticateUser, wishlistController.getAdvertsWishlist)

router.get('/', authMiddleware.authenticateUser, wishlistController.getWishlist)

module.exports = router