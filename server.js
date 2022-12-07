const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectToDB = require('./db');

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', require('./routes/ads.routes'));
app.use('/api', require('./routes/user.routes'));

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});