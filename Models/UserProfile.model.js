const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userProfile = new Schema({

    id: {
        type: Schema.Objectid,
        required: true
    },
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
        type: Number
    },
    wishlistID: {
        type: Schema.Objectid
    },
    reportsID: [{
        type: Schema.Objectid
    }],
    notificationsID: {
        type: Schema.Objectid
    },
    chatrooms: [{
        type: Schema.Objectid
    }],
    ratingsID: {
        type: Schema.Objectid
    },
    socialMediaLinks: [{
        type: String,
        required: true
    }],

})


const UserProfile = mongoose.model('User Profile', userProfile)

module.exports = UserProfile
