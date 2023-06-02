require('dotenv').config();
const app = require('./src/app');
const connectToDb = require('./src/config/db');

const port = process.env.port || 3001;

const start = async () => {
  await connectToDb();

  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
};

start();
