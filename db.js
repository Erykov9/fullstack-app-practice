const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = () => {

  let dbUri = ''
  const NODE_ENV = process.env.NODE_ENV;
  
  if(NODE_ENV === 'production') dbUri = `mongodb+srv://Erykov9:${process.env.ATLAS_KEY}@musicwebsitedb.ihzwpqr.mongodb.net/?retryWrites=true&w=majority`;
  else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/advDB';
  else dbUri = 'mongodb://localhost:27017/advDB';

  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Successfully connected to \'advDB\'!');
  });

  db.on('error', (err) => console.log('Error!' + err));
};

module.exports = connectToDB;