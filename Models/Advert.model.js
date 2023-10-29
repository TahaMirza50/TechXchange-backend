const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserProfile',
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
  condition: {
    type: String,
    enum: ['new', 'used'],
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    require: true
  },
  location: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  sold: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['approved', 'rejected', 'in review'],
    default: 'in review',
  },
  wishListedByUser: [{
    type: Schema.Types.ObjectId,
    ref: 'UserProfile',
  }],
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  delete: {
    type: Boolean,
    default: false,
    required: true
  }
});

const Advert = mongoose.model('Advert', advertSchema)
module.exports = Advert;