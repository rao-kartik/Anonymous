const express = require("express");
const router = express.Router();

router.get("/ping", (_, res) => {
  res.send("The app is working");
});

module.exports = router;
