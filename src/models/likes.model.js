const { Schema, model } = require('mongoose');

const likeSchema = new Schema(
  {
    likedBy: { type: Schema.Types.ObjectId, ref: 'USER' },
    post: { type: Schema.Types.ObjectId, ref: 'POST' },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'likedAt', updatedAt: 'updatedAt' },
  }
);

module.exports = model('LIKE', likeSchema);
