const { json } = require('body-parser');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try  {

    const {login, password} = req.body;

    if(login && typeof login === 'string' && password && typeof password === 'string') {
      const userWithLogin = await User.findOne({login});

      if(userWithLogin) {
        return res.status(409).send({message: 'User with this login already exists'});
      }

      const newUser = await User.create({ login, password: await bcrypt.hash(password, 10)});
      // await newUser.save();
      res.status(200).json({message: 'User created: ' + newUser.login})
    } else {
      res.status(400).send({message: 'Bad request'})
    }
  }catch(err) {
    res.status(500).json({message: err});
  }

};

exports.login = async (req, res) => {
  try {
    const {login, password} = req.body;

    if(login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login });

      if(!user) {
        res.status(400).send({message:'Login or password are incorrect'});
      } else {
        if(bcrypt.compareSync(password, user.password)) {
          req.session.login = user.login;
          res.status(200).send({ message: 'Login successful'})
        } else {
          res.status(400).send({message:'Login or password are incorrect'})
        }
      }
    }
  } catch(err) {
    res.status(500).json({message: err.message})
  }
};

exports.getUser  =  async(req,res)  => {
  res.send('I\'m logged in! ' + req.session.login)
};

exports.logout = async(req, res) => {

  try {
    req.session.destroy();
  }catch(err) {
    res.status(500).send({message: err});
  }
};