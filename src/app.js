const express = require("express");
const router = require("./routes");

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use("/api/v1/", router);

module.exports = app;
