const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    comment: String,
    commentedBy: { type: Schema.Types.ObjectId, ref: 'USER' },
    commentedAt: Date,
    post: { type: Schema.Types.ObjectId, ref: 'POST' },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'commentedAt', updatedAt: 'updatedAt' },
  }
);

module.exports = model('COMMENT', commentSchema);
