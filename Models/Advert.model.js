const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({


    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }, 

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
      },

      location: {
        type: String,
        required: true,
      },

      images: {
        type: [String],
        required: true,
      },

      sold: {
        type: Boolean,
        default: false,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      wishlistedByUser: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
      
},
},
{
    timestamps: true 
});

const adSchema = mongoose.model('AdverttismentSchema', AdSchema)
module.exports = adSchema;