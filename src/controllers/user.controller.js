const USER = require('../models/user.model');
const { generateToken } = require('../utils/jwt');

const authenticateUser = async (req, res) => {
  try {
    const { address } = req.params;

    let user = await USER.findOne({ address }).lean().exec();

    if (!user) {
      user = await USER.create({ address });
    }

    const token = generateToken({
      id: user._id,
      address: user.address,
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
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  authenticateUser,
};
