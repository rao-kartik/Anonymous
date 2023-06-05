require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = ({ id, stay_signed_in = false, expires_in }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: stay_signed_in ? '365d' : expires_in || '1h',
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
