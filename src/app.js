const express = require('express');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(cors());
app.set('trust proxy', true);

app.use(express.json());
app.use('/api/v1/', router);

module.exports = app;
