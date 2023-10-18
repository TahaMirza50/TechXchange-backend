const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true
    },
    ratings:
        [
            {
                ratedUserId: {
                    type: Schema.Types.ObjectId,
                    ref: 'UserProfile',
                    required: true
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 5
                },
            }
        ]
});

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;
