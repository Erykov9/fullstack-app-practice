const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectToDB = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config();


const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

connectToDB();

// if(process.env.NODE_ENV !== 'production') {
//   app.use(
//     cors({
//       origin: ['http://localhost:3000'],
//       credentials: true
//     })
//   );
// } to uncomment

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ 
  // secret: process.env.SECRET_KEY, to uncomment
  secret: 'xyz567',
  store: MongoStore.create(mongoose.connection), 
  resave: false,  
  saveUninitialized: false,
  // cookie: {
  //   secure: process.env.NODE_ENV == 'production',
  // } to uncomment
}));


app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));


app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});