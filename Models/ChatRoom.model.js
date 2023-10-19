const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatRoomSchema = new Schema({
    advertId: {
        type: Schema.Types.ObjectId,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true
    }],
    messages: [{
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: "UserProfile",
            required: true 
        },
        message: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
})

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema)
module.exports = ChatRoom