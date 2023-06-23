const GROUP = require('../models/group.model');
const POST = require('../models/post.model');

const getAllGroups = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const getAllGroupsOfUser = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const createGroup = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const editGroup = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const addMember = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const removeMembers = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const joinGroup = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const leaveGroup = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Group',
      });
    }

    await GROUP.findByIdAndRemove(groupId);
    await POST.deleteMany({group: groupId})

    return res.status(200).send({
      success: true,
      message: 'Group deleted successfully',
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllGroups,
  getAllGroupsOfUser,
  createGroup,
  editGroup,
  addMember,
  removeMembers,
  joinGroup,
  leaveGroup,
  deleteGroup,
};
