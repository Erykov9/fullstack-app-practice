const mongoose = require('mongoose');

const advSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: false, 
    maxlength: 50, 
    minlength: 10 
  },

  description: { 
    type: String, 
    required: false, 
    maxlength: 1000, 
    minlength: 20
  },

  publicDate: {
    type: Date,
    required: false,
  },

  image: {
    type: String,
  },

  price: {
    type: Number,
    required: false,
  },

  location: {
    type: String,
    required: false,
  },

  info: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model('Advertisement', advSchema);