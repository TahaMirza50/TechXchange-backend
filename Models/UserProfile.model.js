const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userProfileSchema = new Schema({
    userName: {
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
        type: Number,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    wishlistID: {
        type: Schema.Types.ObjectId
    },
    reportsID: [{
        type: Schema.Types.ObjectId
    }],
    notificationsID: {
        type: Schema.Types.ObjectId
    },
    chatRooms: [{
        type: Schema.Types.ObjectId,
        ref: 'ChatRoom'
    }],
    reviewsId: {
        type: Schema.Types.ObjectId
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
