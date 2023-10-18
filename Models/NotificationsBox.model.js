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
                notId: {
                    type: Schema.Types.ObjectId,
                    required: true
                },
                type: {
                    type: String,
                    enum: ['fav_add_sold', 'add_approved', 'message_received'],
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
                message: { 
                    type: String,
                    required: true 
                }
            }
        ]
});

const NotificationsBox = mongoose.model('NotificationsBox',notificationsBoxSchema);
module.exports = NotificationsBox;