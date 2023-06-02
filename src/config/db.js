const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectToDb = async () => {
  await mongoose.connect(mongoURI);

  return mongoose.connection;
};

module.exports = connectToDb;
