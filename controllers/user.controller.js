const User = require('../models/User.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await User.find());
  } catch(err) {
    res.status(500).json(err);
  };
};

exports.addUser = async (req, res) => {
  try {
    const { login, password, avatar, phoneNumber} = req.body;
    const newUser = new User({ login, password, avatar, phoneNumber });

    await newUser.save();
    res.json({message: 'OK!'});
  } catch(err) {
    res.status(500).json({message: err})
  }
};