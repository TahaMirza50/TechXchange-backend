const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile', 
      },
},


{
    timestamps: true 
});
const userSchema = mongoose.model('UserSchema', UserSchema)
module.exports = userSchema;