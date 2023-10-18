const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userReportSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true
    },
    reportedUserId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true
    },
    advertId: {
        type: Schema.Types.ObjectId,
        ref: 'Advert',
        required: true
    },
    description: {
        type: String
    },
    inReview: {
        type: boolean,
        default: true
    }
});

const UserReport = mongoose.model('UserReport', userReportSchema);
module.exports = UserReport;