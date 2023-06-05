require('dotenv').config();
const Web3 = require('web3');

const { verifyToken } = require('../utils/jwt');
const { extractCookies } = require('../utils/cookies');

const validateTokenMiddleware = (req, res, next) => {
  const { headers } = req;

  const token =
    extractCookies(headers?.cookie)?.token || req.headers?.authorization?.split(/\s+/).pop();

  if (!token) {
    return res.status(401).send({
      status: false,
      message: 'Token not found',
    });
  }

  try {
    const userData = verifyToken(token);
    req.userId = userData.id;

    next();
  } catch (err) {
    return res.clearCookie('token').send({
      status: false,
      message: err.message,
    });
  }
};

const validateAddressMiddleware = async (req, res, next) => {
  try {
    const { address } = req.params;

    const web3 = new Web3();
    const isValidAddress = web3.utils.isAddress(address);

    if (!isValidAddress) {
      return res.status(401).send({
        success: false,
        message: 'Invalid address',
      });
    }

    // const code = await web3.eth.getCode(address);
    // console.log('code', code);
    // const isContractAddress = code === '0x';

    // if (isContractAddress) {
    //   return res.status(401).send({
    //     success: false,
    //     message: 'Contract address is not allowed',
    //   });
    // }

    next();
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  validateToken: validateTokenMiddleware,
  validateAddress: validateAddressMiddleware,
};
