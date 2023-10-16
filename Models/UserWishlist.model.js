const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userWishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Advert'
    }],
});

const UserWishlist = mongoose.model('UserWishlist',userWishlistSchema);
module.exports = UserWishlist;