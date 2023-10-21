const express = require('express')

const router = express.Router()

const wishlistController = require('../Controllers/Wishlist.controller')
const authMiddleware = require('../Middleware/Auth.middleware');

router.post('/addadvert/:advertid', authMiddleware.authenticateUser,wishlistController.addAdvertWishlist)

router.delete('/removeadvert/:advertid', authMiddleware.authenticateUser, wishlistController.removeAdvertWishlist)

router.get('/advert', authMiddleware.authenticateUser, wishlistController.getAdvertsWishlist)

router.get('/', authMiddleware.authenticateUser, wishlistController.getWishlist)

module.exports = router