const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatRoomSchema = new Schema({
    advertId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "UserProfile"
    }],
    messages: [{
        userId: { type: Schema.Types.ObjectId, ref: "UserProfile" },
        message: String,
        timestamp: Date
    }]
})

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema)
module.exports = ChatRoom