const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsBoxSchema = new Schema({

    userID: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true
    },
    notifications:
        [
            {
                type: {
                    type: String,
                    enum: ['fav_add_sold', 'add_approved', 'message_received', 'add_rejected'],
                    required: true
                },
                advertId: { 
                    type: Schema.Types.ObjectId,
                    ref: 'Advert',
                    required: true
                },
                timestamp: { 
                    type: Date,
                    default: Date.now 
                },
            }
        ]
});

const NotificationsBox = mongoose.model('NotificationsBox',notificationsBoxSchema);
module.exports = NotificationsBox;