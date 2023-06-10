const { ObjectId } = require('mongodb');
const USER = require('../models/user.model');
const { generateToken, verifyToken } = require('../utils/jwt');

const authenticateUser = async (req, res) => {
  try {
    const { address: walletAddress } = req.params;

    let user = await USER.findOne({ walletAddress })
      .populate('followers')
      .populate('following')
      .lean()
      .exec();

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
        walletAddress: user?.walletAddress,
        userName: user?.userName,
        totalFollowers: user?.totalFollowers,
        totalFollowing: user?.totalFollowing,
        followers: user?.followers?.map((_f) => ({
          id: _f?._id,
          walletAddress: _f?.walletAddress,
        })),
        following: user?.following?.map((_f) => ({
          id: _f?._id,
          walletAddress: _f?.walletAddress,
        })),
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

const followUser = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: 'Id Missing',
      });
    }

    const user = USER.findById(id);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'Invalid id',
      });
    }

    const checkFollow = await USER.find({
      $expr: {
        $in: [req.userId, '$followers'],
      },
    });

    if (checkFollow?.length > 0) {
      return res.status(400).send({
        success: false,
        message: 'Already followed',
      });
    }

    await USER.findByIdAndUpdate(id, {
      $inc: { totalFollowers: 1 },
      $push: { followers: req.userId },
    });

    await USER.findByIdAndUpdate(req.userId, {
      $inc: { totalFollowing: 1 },
      $push: { following: id },
    });

    return res.send({
      success: true,
      message: 'followed successfully',
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: 'Id Missing',
      });
    }

    const user = USER.findById(id);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'Invalid id',
      });
    }

    const checkFollow = await USER.find({
      $expr: {
        $in: [req.userId, '$followers'],
      },
    });

    if (checkFollow?.length === 0) {
      return res.status(400).send({
        success: false,
        message: 'Already unfollowed',
      });
    }

    await USER.findByIdAndUpdate(id, {
      $inc: { totalFollowers: -1 },
      $pull: { followers: req.userId },
    });

    await USER.findByIdAndUpdate(req.userId, {
      $inc: { totalFollowing: -1 },
      $pull: { following: id },
    });

    return res.send({
      success: true,
      message: 'Unfollowed successfully',
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
  followUser,
  unfollowUser,
};
