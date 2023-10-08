const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatRoomSchema = new Schema({
    advertid: {
        type: Schema.Types.ObjectId,
        required: true
    },
    participants: {
        type: [Schema.Types.ObjectId]
    },
    messages: [{
        userID: Number,
        message: String,
        timestamp: Date
    }]
})

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema)

module.exports = ChatRoom