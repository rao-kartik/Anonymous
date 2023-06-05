const { Schema, model } = require('mongoose');

const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    description: { type: String, default: null },
    groupType: { type: String, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: 'USER', required: true },
    admins: { type: [{ type: Schema.Types.ObjectId, ref: 'USER' }], default: [] },
    isPrivate: { type: Boolean, default: false },
    totalMembers: { type: Number, default: 0 },
    members: { type: [{ type: Schema.Types.ObjectId, ref: 'USER' }], default: [] },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'postedAt', updatedAt: 'updatedAt' },
  }
);

module.exports = model('GROUP', groupSchema);
