const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userProfile = new Schema({

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
        type: Schema.Objectid
    },
    reportsID: {
        type: [Schema.Objectid]
    },
    notificationsID: {
        type: Schema.Objectid
    },
    chatrooms: {
        type: [Schema.Objectid]
    },
    reviewsID: {
        type: Schema.Objectid
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


const UserProfile = mongoose.model('User Profile', userProfile)

module.exports = UserProfile
