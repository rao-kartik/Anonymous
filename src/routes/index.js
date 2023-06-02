const express = require('express');
const { authenticateUser } = require('../controllers/user.controller');
const { validateAddress } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/ping', (_, res) => {
  res.send('The app is working');
});

router.get('/authenticate/:address', validateAddress, authenticateUser);

module.exports = router;
