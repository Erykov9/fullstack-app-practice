const mongoose = require('mongoose');

const advSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    maxlength: 50, 
    minlength: 10 
  },

  description: { 
    type: String, 
    required: true, 
    maxlength: 1000, 
    minlength: 20
  },

  publicDate: {
    type: Date,
    required: true,
  },

  image: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  info: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Advertisement', advSchema);