const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    userName: { type: String, default: null },
    walletAddress: { type: String, required: true },
    totalFollowers: { type: Number, default: 0 },
    followers: { type: [{ type: Schema.Types.ObjectId, ref: 'USER' }] },
    totalFollowing: { type: Number, default: 0 },
    following: { type: [{ type: Schema.Types.ObjectId, ref: 'USER' }] },
    isAdmin: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

userSchema.index({ name: 'text' });

module.exports = model('USER', userSchema);
