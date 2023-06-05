const USER = require('../models/user.model');
const { generateToken, verifyToken } = require('../utils/jwt');

const authenticateUser = async (req, res) => {
  try {
    const { address: walletAddress } = req.params;

    let user = await USER.findOne({ walletAddress }).lean().exec();

    if (!user) {
      user = await USER.create({ walletAddress });
    }

    const token = generateToken({
      id: user._id,
    });

    return res.send({
      success: true,
      userDetails: {
        id: user._id,
        address: user.address,
        userName: user.userName,
      },
      token,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  authenticateUser,
};
