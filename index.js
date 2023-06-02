const app = require("./src/app");
require("dotenv").config();

const port = process.env.port || 3000;

const start = () => {
  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
};

start();
