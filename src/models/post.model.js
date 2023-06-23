const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    post: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'USER', required: true },
    totalLikes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    group: { type: Schema.Types.ObjectId, ref: 'GROUP', default: null },
    visibleTo: {
      type: String,
      enum: ['all', 'followers', 'self'],
      default: 'all',
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'postedAt', updatedAt: 'updatedAt' },
    toJSON: { virtuals: true },
    id: false,
  }
);

module.exports = model('POST', postSchema);
