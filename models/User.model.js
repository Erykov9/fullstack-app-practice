const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 20,
  },

  password: {
    type: String,
    require: true,
    minlength: 7,
  },

  // avatar: {
  //   type: String,
  //   require: true,
  // },

  // phoneNumber: {
  //   type: String,
  //   require: true
  // }
});

module.exports = mongoose.model('User', userSchema);