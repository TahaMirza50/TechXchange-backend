const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvertSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
  images: [{
    type: String,
    required: true,
  }],
  sold: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  wishListedByUser: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Advert = mongoose.model('Advert', AdvertSchema)
module.exports = Advert;