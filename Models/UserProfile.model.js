const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userProfileSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    CNIC: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        default: null,
        min: 0,
        max: 5
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    wishlistID: {
        type: Schema.Types.ObjectId,
        ref: 'UserWishlist',
        require: true
    },
    reportsID: [{
        type: Schema.Types.ObjectId,
        ref: 'UserReport'
    }],
    notificationsID: {
        type: Schema.Types.ObjectId,
        ref: 'NotificationsBox',
        require: true
    },
    chatRooms: [{
        type: Schema.Types.ObjectId,
        ref: 'ChatRoom'
    }],
    reviewsID: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
    socialMediaLinks: {
        type: [String],
        required: true,
        validate: {
            validator: (links) => {
                return links.length <= 3
            },
            message: 'Social media links can have at most 3 elements.'
        }
    },
})


const UserProfile = mongoose.model('UserProfile', userProfileSchema)
module.exports = UserProfile
