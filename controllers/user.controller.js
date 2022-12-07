const User = require('../models/User.model');

exports.login = async (req, res) => {
  try {
    const { login, passowrd } = req.body;
    
    res.json(await User.find());
  } catch(err) {
    res.status(500).json(err);
  };
};

exports.registerUser = async (req, res) => {
  try {
    const { login, password, avatar, phoneNumber} = req.body;
    const newUser = new User({ login, password, avatar, phoneNumber });

    await newUser.save();
    res.json({message: 'OK!'});
  } catch(err) {
    res.status(500).json({message: err})
  }
};